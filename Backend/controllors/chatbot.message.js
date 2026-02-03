import Bot from "../models/bot.model.js";
import User from "../models/user.model.js"

export const Message = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text?.trim()) {
            return res.status(400).json({ error: "text is cannot be empty" });
        }

        const user = await User.create({
            sender: "user",
            text
        })

        const botResponces = {
            "hello": "Hey, how can I help you?",
"mujhe job chahiye": "Aap kis field me job chahte hain?",
"freshers ke liye job": "Freshers ke liye entry-level jobs available hain",
"internship chahiye": "Aap kis domain me internship chahte hain?",
"software job": "Software development roles available hain",
"python job": "Python developer ke liye openings hain",
"data analyst internship": "Data analyst internships available hain",
"work from home job": "Remote jobs jaise data entry aur content writing available hain",
"marketing internship": "Digital marketing internships open hain",
"hr internship": "HR internships recruitment aur payroll me available hain",
"mba internship": "MBA students ke liye HR, Finance aur Marketing internships hain",
"engineering trainee": "Engineering trainee programs 6 mahine ke hote hain",
"government job": "Government sector me apprentice aur trainee jobs hain",
"part time job": "Part-time jobs students ke liye available hain",
"summer internship": "Summer internships multiple domains me available hain",
"bca job": "BCA students ke liye IT support aur testing jobs hain",
"btech job": "BTech graduates ke liye technical roles available hain",
"mechanical job": "Mechanical engineers ke liye production jobs hain",
"civil job": "Civil engineers ke liye site engineer roles hain",
"electrical job": "Electrical maintenance roles available hain",
"call center job": "Domestic aur international call center jobs available hain",
"teaching internship": "Teaching internships schools aur ed-tech platforms par hain",
"online internship": "Online internships work-from-home available hain",
"paid internship": "Haan, paid internships bhi available hain",
"unpaid internship": "Unpaid internships learning ke liye available hain",
"internship duration": "Internship 1 se 6 mahine ki hoti hai",
"internship certificate": "Internship complete karne par certificate milega",
"job location delhi": "Delhi me multiple job openings hain",
"job location mumbai": "Mumbai me IT aur finance jobs available hain",
"job location pune": "Pune me software jobs available hain",
"job location bangalore": "Bangalore me IT jobs zyada available hain",
"resume kaise banaye": "Main aapko resume format suggest kar sakta hoon",
"interview tips": "Interview ke liye communication aur confidence zaruri hai",
"fresher without experience": "Freshers ke liye training-based jobs available hain",
"skill based job": "Aapke skills ke according job suggest ki ja sakti hai",
"digital marketing job": "SEO, SMM aur PPC jobs available hain",
"graphic design internship": "Graphic design internships creative agencies me hain",
"content writing job": "Content writing jobs work-from-home available hain",
"finance internship": "Finance internships accounting aur audit me hain",
"accounts job": "Accounts executive roles available hain",
"banking job": "Banking sector me clerk aur trainee jobs hain",
"hotel internship": "Hotels me management internships available hain",
"retail job": "Retail sector me sales associate jobs hain",
"sales internship": "Sales internships business development me available hain",
"customer support job": "Customer support roles available hain",
"training program": "Training programs placement assistance ke sath hote hain",
"job salary": "Salary role aur experience par depend karti hai",
"trainee salary": "Trainee salary 10,000 se 20,000 tak hoti hai",
"night shift job": "Night shift BPO jobs available hain",
"day shift job": "Day shift office jobs available hain",
"internship for students": "Students ke liye flexible internships available hain",
"diploma job": "Diploma holders ke liye technician jobs hain",
"iti job": "ITI candidates ke liye trade-based jobs available hain",
"cyber security internship": "Cyber security internships IT firms offer karti hain",
"web developer job": "Web developers ke liye openings available hain",
"frontend internship": "Frontend internships HTML, CSS, JS par based hain",
"backend internship": "Backend internships Python aur Java par based hain",
"ai internship": "AI aur ML internships advanced learners ke liye hain",
"data entry job": "Data entry jobs work-from-home available hain",
"office assistant job": "Office assistant roles available hain",
"admin job": "Admin support jobs available hain",
"logistics job": "Logistics coordinator roles available hain",
"supply chain internship": "Supply chain internships manufacturing sector me hain",
"healthcare job": "Healthcare sector me assistant jobs available hain",
"pharmacy internship": "Pharmacy students ke liye internships available hain",
"lab trainee": "Lab trainee positions hospitals me hain",
"ngo internship": "NGO internships social work ke liye available hain",
"startup internship": "Startups me learning-based internships hoti hain",
"placement assistance": "Haan, placement assistance provide ki jati hai",
"job apply kaise kare": "Aap online portal ya HR email ke through apply kar sakte hain",
"contact hr": "Main aapko HR details share kar sakta hoon",
"thank you": "Aapka swagat hai, aur madad chahiye to batayein"

            }
        const normalizedText = text.toLowerCase().trim();
        const botResponce =botResponces[normalizedText] || "sorry, I don't understand that!!!";

        const bot = await Bot.create({
            text: botResponce
        })

        return res.status(200).json({
            userMessage: user.text,
            botMessage: bot.text
        })
    } catch (error) {
            console.log("Error in Message Controller:", error)
    }
}
