import { auth } from "../lib/auth";

async function createUsers() {
    const users = [
        {
            email: "admin@mail.com",
            password: "password",
            name: "System Admin",
            role: "ADMIN"
        },
        {
            email: "seller@mail.com",
            password: "password",
            name: "Pharmacist Controller",
            role: "SELLER"
        },
        {
            email: "customer@mail.com",
            password: "password",
            name: "Medical Staff",
            role: "CUSTOMER"
        }
    ];

    console.log("🚀 Starting User Creation...");

    for (const user of users) {
        try {
            console.log(`Creating ${user.role}: ${user.email}...`);
            const res = await auth.api.signUpEmail({
                body: {
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    role: user.role
                }
            });
            console.log(`✅ Created ${user.email}`);
        } catch (error: any) {
            if (error.message?.includes("already exists")) {
                console.log(`⚠️ User ${user.email} already exists.`);
            } else {
                console.error(`❌ Error creating ${user.email}:`, error.message || error);
            }
        }
    }

    console.log("✨ User Creation Complete!");
}

createUsers().catch(console.error);
