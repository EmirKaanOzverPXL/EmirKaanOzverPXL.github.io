export interface CardType {
	id: number;
	title: string;
	description: string;
	image?: string;
	tags?: string[];
}

export const cardData: CardType[] = [
	{
		id: 1,
		title: "Over Mij",
		description:
			"Ik ben een 20-jarige student Toegepaste Informatica aan de Hogeschool PXL in Hasselt. Ik ben iemand die graag nieuwe dingen ontdekt en voortdurend wil bijleren. Mijn grootste passie ligt bij alles wat met software te maken heeft, en ik vind het geweldig om creatieve, gebruiksvriendelijke en visueel aantrekkelijke websites en applicaties te ontwikkelen.",
		image: "/assets/emir-wide.jpeg",
		tags: ["Student", "Developer", "Tech Enthusiast"],
	},
	{
		id: 2,
		title: "Technische Vaardigheden",
		description:
			"Ik beschik over een brede waaier aan technische vaardigheden, waaronder het bouwen van .NET REST APIs en mobiele applicaties met .NET MAUI, React Native, en Flutter. Ik werk vlot met JavaScript, NodeJS, TypeScript, HTML, CSS en verschillende databases zoals MySQL, SQL Server en SQLite. Ook ben ik vertrouwd met Linux, Docker, Java, Python, Git, GitHub Actions en WebSockets (SignalR).",
		image:
			"https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		tags: ["Full Stack", "Mobile Dev", "Web Dev", "DevOps"],
	},
	{
		id: 3,
		title: "UI/UX & Teamwork",
		description:
			"Naast mijn technische kennis hecht ik veel belang aan UI/UX design, omdat ik geloof dat een goede gebruikerservaring essentieel is voor elk softwareproject. Verder werk ik graag in teamverband en heb ik ervaring met projectmanagement. Ik ben sterk in het analyseren van problemen en het vinden van efficiënte oplossingen.",
		image:
			"https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		tags: ["UI/UX Design", "Teamwork", "Probleemoplossend denken"],
	},
	{
		id: 4,
		title: "Seminaries & Workshops",
		description:
			"Actieve deelname aan diverse seminaries en workshops, waaronder API & Security Testing, Flutter development, Prompt Engineering met AI, en Domain-Driven Design. Deze activiteiten tonen mijn continue drang naar kennis en professionele ontwikkeling. De afbeelding hier is een screenshot van een semenarie over 'GenAI'.",
		image: "/assets/superhero_wide.png",
		tags: ["Workshops", "Seminaries", "Professionele Ontwikkeling"],
	},
	{
		id: 5,
		title: "Internationale Ervaring",
		description:
			"Deelname aan een studiereis naar Linz en Salzburg, met bezoeken aan de University of Applied Sciences Upper Austria en het Ars Electronica Center. Deze ervaring verbreedde mijn perspectief op technologie en innovatie in een internationale context.",
		image: "/assets/aec.jpg",
		tags: ["Internationalisering", "Culturele Uitwisseling", "Innovatie"],
	},
	{
		id: 6,
		title: "Hackathon Ervaring",
		description:
			"Deelname aan 'Hack the Future' bij Flexso, waar ik werkte aan de 'Intergalactic Cockpit' applicatie. Dit project onderzocht de kans op buitenaards leven door het analyseren van data over sterrenstelsels en het gebruik van externe APIs voor exploratie-rapporten.",
		image: "/assets/hackathon.jpg",
		tags: ["Hackathon", "Innovatie", "Teamwork"],
	},
	{
		id: 7,
		title: "Toekomstvisie",
		description:
			"Mijn ambitie is om mezelf de komende jaren verder te ontwikkelen tot een allround software engineer. Over drie tot vijf jaar wil ik graag werken aan innovatieve projecten in een team waar ik zowel mijn technische als creatieve vaardigheden kan inzetten.",
		tags: ["Carrière", "Groei", "Ambitie"],
	},
	{
		id: 8,
		title: "Persoonlijke Ontwikkeling",
		description:
			"Naast technische vaardigheden focus ik ook op het ontwikkelen van soft skills zoals communicatie en leiderschap. Ik wil in de toekomst grotere projecten kunnen coördineren en een team kunnen aansturen. Daarnaast blijf ik mijn kennis van moderne frameworks en tools uitbreiden.",
		image:
			"https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		tags: ["Soft Skills", "Leiderschap", "Persoonlijke Groei"],
	},
];
