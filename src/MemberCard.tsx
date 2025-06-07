import React from "react";
import { useTranslation } from "react-i18next";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Mail, Phone } from "@mui/icons-material";

interface TeamMember {
  imageSrc: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  quote: string;
  linkedInUrl: string;
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="max-w-[550px] bg-gradient-to-b from-gray-300/40 to-gray-400/30 p-5 my-8 mx-auto border-t-4 border-blue-500 rounded-2xl text-center relative backdrop-blur-lg">
      <img
        src={member.imageSrc}
        alt={member.name}
        className="w-[150px] h-[150px] rounded-full object-cover absolute -top-20 left-1/2 -translate-x-1/2 border-4 border-white shadow-md"
      />
      <div className="flex justify-center gap-4 mt-16">
        <a href={member.linkedInUrl} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon
            style={{ fontSize: "3rem" }}
            className="text-white hover:scale-135"
          />
        </a>
        <a href={`mailto:${member.email}`}>
          <Mail
            style={{ fontSize: "3rem" }}
            className="text-white hover:scale-135"
          />
        </a>
        {member.phoneNumber && (
          <a href={`tel:${member.phoneNumber}`}>
            <Phone
              style={{ fontSize: "3rem" }}
              className="text-white hover:scale-135"
            />
          </a>
        )}
      </div>
      <p className="mt-2 italic text-[17px] text-white">"{member.quote}"</p>
      <hr className="mt-2 border-t border-gray-200" />
      <h3 className="mt-2 font-bold text-white">{member.name}</h3>
      <p className="text-white">{member.description}</p>
    </div>
  );
};

const TeamSlider = () => {
  const { t } = useTranslation();

  const teamMembers: TeamMember[] = [
    {
      imageSrc: "team-laurin.jpg",
      name: "Laurin Hagemann",
      description: t("about.team-Laurin"),
      email: "laurin@learngraph.org",
      phoneNumber: "+491631925215",
      quote: t("about.quote-Laurin"),
      linkedInUrl: "https://www.linkedin.com/in/laurin-hagemann/",
    },
    {
      imageSrc: "team-jamal.png",
      name: "Jamal Daho",
      description: t("about.team-Jamal"),
      email: "j.daho@learngraph.org",
      phoneNumber: "+491729121031",
      quote: t("about.quote-Jamal"),
      linkedInUrl: "https://www.linkedin.com/in/jamaldaho/",
    },
    {
      imageSrc: "team-efecan.jpeg",
      name: "Efecan Köse",
      description: t("about.team-Efecan"),
      email: "efe@learngraph.org",
      phoneNumber: "",
      quote: t("about.quote-Efecan"),
      linkedInUrl: "https://www.linkedin.com/in/efecan-k%C3%B6se-3b45a432a/",
    },
    {
      imageSrc: "team-talal.jpg",
      name: "Muhammad Talal",
      description: t("about.team-Talal"),
      email: "muhammad.talal@learngraph.org",
      phoneNumber: "+491638692006",
      quote: t("about.quote-Talal"),
      linkedInUrl: "https://www.linkedin.com/in/muhammad-talal-02392b230/",
    },
    {
      imageSrc: "team-jamileh.jpg",
      name: "Jamileh Montazer",
      description: t("about.team-Jamileh"),
      email: "J.montazery@gmail.com", //"jamileh@learngraph.org",
      phoneNumber: "",
      quote: t("about.quote-Jamileh"),
      linkedInUrl: "https://www.linkedin.com/in/jamileh-montazer-torbati/",
    },
    {
      imageSrc: "team-arsham.png",
      name: "Arsham Delvarani",
      description: t("about.team-Arsham"),
      email: "arshamdelvarani2@gmail.com", //"jamileh@learngraph.org",
      phoneNumber: "+49 176 84805378",
      quote: t("about.quote-Arsham"),
      linkedInUrl: "https://www.linkedin.com/in/arsham-delvarani-679893151",
    },
    {
      imageSrc: "team-ralf.jpeg",
      name: "Ralf Waldvogel (CEO accelerat/it GmbH)",
      description: t("about.team-Ralf"),
      email: "ralf.waldvogel@acceleratit.gmbh",
      phoneNumber: "",
      quote: t("about.quote-Ralf"),
      linkedInUrl: "https://www.xing.com/profile/Ralf_Waldvogel3",
    },
    {
      imageSrc: "team-malin.jpeg",
      name: "Malin Rebke",
      description: t("about.team-Malin"),
      email: "malin.rebke@gmail.com",
      phoneNumber: "",
      quote: t("about.quote-Malin"),
      linkedInUrl: "https://www.linkedin.com/in/malinrebke",
    },
    {
      imageSrc: "team-nawa.png",
      name: "Nawa Sakanga",
      description: t("about.team-Nawa"),
      email: "nawa@learngraph.org",
      phoneNumber: "",
      quote: t("about.quote-Nawa"),
      linkedInUrl: "https://www.linkedin.com/in/nawa-sakanga-98374a58/",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 flex-wrap w-full">
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </div>
  );
};

export default TeamSlider;
