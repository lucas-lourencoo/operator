import { faker } from "@faker-js/faker";
import { db } from "./index";
import { roastFindings, roasts, suggestedImprovements } from "./schema";

async function seed() {
	console.log("🌱 Seeding database...");

	const languages = [
		"javascript",
		"typescript",
		"python",
		"rust",
		"go",
		"java",
		"cpp",
	];
	const findingTypes = ["critical", "warning", "good", "neutral"] as const;

	const roastInserts = Array.from({ length: 100 }).map(() => ({
		code: `function ${faker.hacker.verb()}${faker.hacker.noun()}() {\n  // TODO: ${faker.hacker.phrase()}\n  console.log("${faker.company.catchPhrase()}");\n}`,
		language: faker.helpers.arrayElement(languages),
		score: faker.number.int({ min: 0, max: 100 }),
		summary: faker.helpers.arrayElement([
			"Este código parece ter sido escrito por uma criança de 5 anos... bêbada.",
			"O ChatGPT escreveria algo melhor que isso em 2 segundos.",
			"Sua indentação é um crime de guerra em 42 países.",
			"Eu já vi spaghettis mais organizados que essa lógica.",
			"Parabéns, você reinventou o erro de lógica.",
			"Essa função é tão grande que tem seu próprio CEP.",
			"O garbage collector vai chorar quando ler isso.",
			"Se 'pior prática' fosse um esporte, você seria medalhista de ouro.",
		]),
	}));

	console.log("Inserting roasts...");
	const insertedRoasts = await db
		.insert(roasts)
		.values(roastInserts)
		.returning({ id: roasts.id });

	const findingInserts = [];
	const improvementInserts = [];

	for (const roast of insertedRoasts) {
		// 2-4 findings per roast
		const numFindings = faker.number.int({ min: 2, max: 4 });
		for (let i = 0; i < numFindings; i++) {
			findingInserts.push({
				roastId: roast.id,
				type: faker.helpers.arrayElement(findingTypes),
				title: faker.hacker.adjective() + " " + faker.hacker.noun(),
				description: faker.hacker.phrase() + " " + faker.lorem.sentence(),
			});
		}

		// 1-2 improvements per roast
		const numImprovements = faker.number.int({ min: 1, max: 2 });
		for (let i = 0; i < numImprovements; i++) {
			improvementInserts.push({
				roastId: roast.id,
				originalCode: `var x = "${faker.lorem.word()}";`,
				improvedCode: `const ${faker.lorem.word()} = "${faker.lorem.word()}";`,
				explanation: faker.company.buzzPhrase() + ". " + faker.hacker.phrase(),
			});
		}
	}

	console.log(`Inserting ${findingInserts.length} findings...`);
	await db.insert(roastFindings).values(findingInserts);

	console.log(`Inserting ${improvementInserts.length} improvements...`);
	await db.insert(suggestedImprovements).values(improvementInserts);

	console.log("✅ Seed completed successfully!");
	process.exit(0);
}

seed().catch((err) => {
	console.error("❌ Seed failed:");
	console.error(err);
	process.exit(1);
});
