const topics = [
	"The importance of digital literacy in today's world",
	"How social media has changed communication",
	"The future of artificial intelligence",
	"Climate change and individual responsibility",
	"The value of learning a second language",
	"Should higher education be free?",
	"The most significant invention of the 21st century",
	"The impact of remote work on society",
	"Is space exploration worth the cost?",
	"The role of art in modern society",
	"Digital privacy in the information age",
	"The benefits and drawbacks of globalization",
	"Should voting be mandatory?",
	"The influence of technology on childhood development",
	"The future of transportation",
	"Universal basic income: pros and cons",
	"The importance of critical thinking skills",
	"Cultural appropriation versus cultural appreciation",
	"The ethics of genetic engineering",
	"How to combat misinformation online",
	"The value of traveling to different countries",
	"The impact of automation on employment",
	"The role of government in healthcare",
	"Is social media helping or hurting society?",
	"The importance of failure in achieving success",
];

function getRandomTopic() {
	const randomIndex = Math.floor(Math.random() * topics.length);
	return topics[randomIndex];
}

export { topics, getRandomTopic };
