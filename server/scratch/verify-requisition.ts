import { prisma } from '../lib/prisma.ts';
import { orderService } from '../src/modules/order/order.service.ts';

async function testRequisition() {
  try {
    console.log("Testing EMERGENCY requisition...");
    
    // Find a medicine
    const med = await prisma.medicine.findFirst();
    if (!med) {
      console.error("No medicine found in DB. Run seed first.");
      return;
    }

    // Ensure the test user exists in DB
    const testUser = await prisma.user.upsert({
        where: { email: 'nurse@hospital.com' },
        update: {},
        create: {
            id: 'test-nurse-id',
            name: 'Nurse Joy',
            email: 'nurse@hospital.com',
            role: 'CUSTOMER',
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });

    // CORRECT ARGUMENT ORDER: (userId, items, priority)
    const result = await orderService.createOrder(
      testUser.id,
      [
        { medicineId: med.id, quantity: 2 }
      ],
      "EMERGENCY"
    );

    console.log("Requisition Result Status:", result.status);
    console.log("Requisition Result Priority:", result.priority);
    console.log("Processing Note:", (result as any).processingNote);
    
    if (result.priority === "EMERGENCY" && (result as any).processingNote?.includes("BYPASS")) {
      console.log("SUCCESS: Emergency priority and bypass note verified.");
    } else {
      console.log("FAILURE: Priority or note missing.");
    }

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testRequisition();
