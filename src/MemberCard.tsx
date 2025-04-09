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
      imageSrc: "team-namatama.jpg",
      name: "Namatama Theresa Katanekwa",
      description: t("about.team-Namatama"),
      email: "nama@learngraph.org",
      phoneNumber: "",
      quote: t("about.quote-Nama"),
      linkedInUrl:
        "https://www.linkedin.com/in/namatama-theresa-katanekwa-5697b3196/",
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
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap w-full">
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </div>
  );
};

export default TeamSlider;
