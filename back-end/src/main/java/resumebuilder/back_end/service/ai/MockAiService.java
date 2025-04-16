package resumebuilder.back_end.service.ai;

import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.JsonProcessingException;

/*
 * This is used as a placeholder for the text-enhancing service, 
 * so that the endpoints still work withthout making a call the 
 * actual LLM service or without having a local model installed.
 */
@Service
@Qualifier("Mock")
public class MockAiService implements AiService {

    public MockAiService() {
    }

    @Override
    public String enhanceResumeBulletPoints(String initialText) {
        return "Mock Ai Service: " + initialText;
    }

    @Override
    public Map<String, Object> scanResumeToJSON(String resume) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(this.mockResume,
                new TypeReference<Map<String, Object>>() {
                });
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            return map;
        }
        return map;
    }

    private String mockResume = "{\n" + //
            "  \"name\": \"Mock Resume From MockAiService\",\n" + //
            "  \"contactMethods\": [\n" + //
            "    \"lorenzodfmion@gmail.com\"\n" + //
            "  ],\n" + //
            "  \"education\": {\n" + //
            "    \"visible\": true,\n" + //
            "    \"content\": {\n" + //
            "      \"institution\": \"The Ohio State University\",\n" + //
            "      \"location\": \"Columbus, OH\",\n" + //
            "      \"degree\": \"Computer Science and Engineering, Specialization in Software Engineering\",\n" + //
            "      \"graduationDate\": {\n" + //
            "        \"month\": 5,\n" + //
            "        \"year\": 2026\n" + //
            "      },\n" + //
            "      \"specialization\": \"\",\n" + //
            "      \"minor\": \"\",\n" + //
            "      \"gpa\": \"3.8\",\n" + //
            "      \"honors\": \"4x Dean’s List, 2x Scholar-Athlete Award, Academic All-Big Ten, USFCA All-Academic Team 23-24\"\n"
            + //
            "    }\n" + //
            "  },\n" + //
            "  \"experience\": {\n" + //
            "    \"visible\": true,\n" + //
            "    \"content\": [\n" + //
            "      {\n" + //
            "        \"6\": {},\n" + //
            "        \"7\": {},\n" + //
            "        \"id\": 0,\n" + //
            "        \"visible\": true,\n" + //
            "        \"company\": \"OSU Wexner Medical Center - IT Department\",\n" + //
            "        \"description\": \"Worked on Vitals, the proprietary digital platform used by Ohio State’s 750 medical students and 3,400+ academic staff\\n"
            + //
            "Wrote R scripts to create SQL queries to upload data from 200+ new matriculants to the Vitals MySQL database\\n"
            + //
            "Used Angular with Kendo UI and Bootstrap to streamline the Vitals user interface, making it more responsive on mobile devices\\n"
            + //
            "Participated professional development sessions twice a week to further develop communication, leadership, and organizational skills\",\n"
            + //
            "        \"location\": \"\",\n" + //
            "        \"position\": \"Software Engineering Intern\",\n" + //
            "        \"startDate\": {\n" + //
            "          \"month\": 6,\n" + //
            "          \"year\": 2024\n" + //
            "        },\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 7,\n" + //
            "          \"year\": 2024\n" + //
            "        }\n" + //
            "      },\n" + //
            "      {\n" + //
            "        \"1\": {},\n" + //
            "        \"startDate\": {\n" + //
            "          \"month\": 1,\n" + //
            "          \"year\": \"2024\"\n" + //
            "        },\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 0\n" + //
            "        },\n" + //
            "        \"location\": \"Columbus, OH\",\n" + //
            "        \"position\": \"Web Project Lead\",\n" + //
            "        \"company\": \"Collaborative Software Development Club at Ohio State\",\n" + //
            "        \"description\": \"Manage and teach 18 students in weekly meetings to develop a Full-Stack (React.js + Spring Boot) AI Resume Builder\\n"
            + //
            " Designed a REST API with Spring Boot using the Controller, Service Repository pattern to manage resumes and resume contents\\n"
            + //
            " Incorporated MongoDB Atlas NoSQL database with Spring Boot and developed a non-relational schema to store resume information\\n"
            + //
            " Developed a resume builder interface with React.js, Vite, Taiwind, Shadcn UI to handle user input for creation of formatted resumes\\n"
            + //
            " Led a team of 5 students through the creation of a Full-Stack blog application using Express.js, React.js, MongoDB Atlas\\n"
            + //
            " Redesigned the club website with better UI design using Next.js, TypeScript, and CSS, attracting ~70 students to the first fall meeting\\n"
            + //
            " Created a custom CMS using the Notion API and Next.js SSG (Static Site Generation) to facilitate changes to the club website\"\n"
            + //
            "      }\n" + //
            "    ]\n" + //
            "  },\n" + //
            "  \"projects\": {\n" + //
            "    \"visible\": true,\n" + //
            "    \"content\": [\n" + //
            "      {\n" + //
            "        \"id\": 0,\n" + //
            "        \"visible\": true,\n" + //
            "        \"organization\": \"\",\n" + //
            "        \"description\": \"Co-founded and developed a centralized platform for results and stats of NCAA fencing results and meets using TypeScript and Next.js\\n"
            + //
            " Created Python scripts using Pandas and BeautifulSoup to get data from 1300+ matches, 250+ athletes from CSV and HTML files\\n"
            + //
            " Reduced page loading time and improved SEO by leveraging Static Site Generation (SSG) to create pages for over 80+ teams\\n"
            + //
            " Increased development speed and reduced code duplication by creating reusable UI components based on ShadcnUI and Tailwind CSS\",\n"
            + //
            "        \"location\": \"\",\n" + //
            "        \"title\": \"NonStop Fencing Web App\",\n" + //
            "        \"startDate\": {\n" + //
            "          \"year\": null\n" + //
            "        },\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 2,\n" + //
            "          \"year\": 2024\n" + //
            "        },\n" + //
            "        \"startYear\": \"2024\",\n" + //
            "        \"technologies\": \"TypeScript, Next.js, React.js, Python, Pandas, BeautifulSoup\",\n" + //
            "        \"link\": \"https://github.com/ldfMion/FEH_Robot_A\"\n" + //
            "      },\n" + //
            "      {\n" + //
            "        \"startDate\": {\n" + //
            "          \"month\": 1,\n" + //
            "          \"year\": 2023\n" + //
            "        },\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 4,\n" + //
            "          \"year\": 2024\n" + //
            "        },\n" + //
            "        \"location\": \"\",\n" + //
            "        \"title\": \"Robot Competition - Fundamentals of Engineering Honors \",\n" + //
            "        \"description\": \"Coordinated a team of 3 people to prototype, fabricate, and program a robot for the FEH robotics course competition\\n"
            + //
            " Utilized C++ and SolidWorks to program the FEH microcontroller and fabricate essential robot components\\n"
            + //
            " Accelerated development by creating a C++ library that abstracted encoder counts and the Robot Positioning System\",\n"
            + //
            "        \"technologies\": \"\",\n" + //
            "        \"link\": \"https://github.com/ldfMion/FEH_Robot_A\",\n" + //
            "        \"organization\": \"\",\n" + //
            "        \"startYear\": \"2023\",\n" + //
            "        \"endMonth\": {\n" + //
            "          \"month\": 4\n" + //
            "        },\n" + //
            "        \"endYear\": {\n" + //
            "          \"year\": 20235\n" + //
            "        }\n" + //
            "      },\n" + //
            "      {\n" + //
            "        \"startDate\": {},\n" + //
            "        \"endDate\": {\n" + //
            "          \"month\": 0\n" + //
            "        },\n" + //
            "        \"location\": \"\",\n" + //
            "        \"title\": \"Instant Fencing Web App\",\n" + //
            "        \"description\": \"Developed a web app using Next.js that allows fencers to create mock competitions without having to do calculations by hand\\n"
            + //
            "Incorporated Firebase Authentication and Firestore, allowing for real-time collaboration between users\\n"
            + //
            " Formalized a non-relational (NoSQL) data modeling schema within Firestore for managing users, events, results, and bouts\\n"
            + //
            " Designed a custom user interface (UI) in Figma and CSS modules to allow for easy visualization of results and tables\\n"
            + //
            " Developed an automated end-to-end (E2E) testing suite for the user interface using the Cypress testing library, increasing bug detectio\",\n"
            + //
            "        \"technologies\": \"JavaScript, Next.js React.js, Firebase, CSS, Figma, Cypress\",\n" + //
            "        \"link\": \"github.com\",\n" + //
            "        \"organization\": \"\",\n" + //
            "        \"startYear\": \"2024\"\n" + //
            "      }\n" + //
            "    ]\n" + //
            "  },\n" + //
            "  \"skills\": {\n" + //
            "    \"visible\": true,\n" + //
            "    \"content\": [\n" + //
            "      \"JavaScript\",\n" + //
            "      \"React.js\"\n" + //
            "    ]\n" + //
            "  },\n" + //
            "  \"orderOfSections\": [\n" + //
            "    \"EDUCATION\",\n" + //
            "    \"SKILLS\",\n" + //
            "    \"EXPERIENCE\",\n" + //
            "    \"PROJECTS\"\n" + //
            "  ],\n" + //
            "  \"description\": \"<this briefly identifies the resume. keep it in 2-3 words.>\"\n" + //
            "}";
}
