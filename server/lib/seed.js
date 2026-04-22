import { prisma } from './prisma.ts';

const categories = [
    { name: "Emergency" },
    { name: "Surgical" },
    { name: "General" },
    { name: "Pharmacy" },
    { name: "Lab Supplies" },
    { name: "First Aid" }
];

const medicines = [
    {
        name: "Epinephrine Injection",
        description: "Emergency treatment of allergic reactions.",
        price: 45.0,
        stock: 5,
        minStockAlert: 10,
        manufacturer: "BioMed Corp",
        category: "Emergency",
        sellerID: "admin-id"
    },
    {
        name: "Surgical Gloves (Size 7)",
        description: "Sterile latex gloves for surgical procedures.",
        price: 12.5,
        stock: 200,
        minStockAlert: 50,
        manufacturer: "SafeTouch",
        category: "Surgical",
        sellerID: "admin-id"
    },
    {
        name: "Paracetamol 500mg",
        description: "General pain relief and fever reducer.",
        price: 2.0,
        stock: 1000,
        minStockAlert: 100,
        manufacturer: "GenPharma",
        category: "General",
        sellerID: "admin-id"
    },
    {
        name: "Insulin Glargine",
        description: "Long-acting insulin for diabetes management.",
        price: 85.0,
        stock: 8,
        minStockAlert: 15,
        manufacturer: "NovoCare",
        category: "Pharmacy",
        sellerID: "admin-id"
    }
];

const seed = async () => {
    console.log("Seeding categories...");
    await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
    });

    console.log("Seeding medicines...");
    for (const med of medicines) {
        await prisma.medicine.create({
            data: med
        }).catch(e => {
            console.log(`Skipping ${med.name} (likely already exists)`);
        });
    }
};

seed().then(() => {
    console.log("Seeding completed successfully.");
    process.exit(0);
}).catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
});