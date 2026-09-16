export interface SolarEclipseTopic {
  id: string;
  name: string;
  description: string;
}

export interface SolarEclipseDependency {
  topicId: string;
  prerequisiteId: string;
}

export interface SolarEclipseView {
  id: string;
  label: string;
  knownTopicIds: string[];
  journeyTopicIds: string[];
  reading: string;
}

interface SolarEclipsePuzzle {
  status: "prototype";
  title: string;
  goalTopicId: string;
  topics: SolarEclipseTopic[];
  dependencies: SolarEclipseDependency[];
  views: SolarEclipseView[];
}

export const solarEclipsePuzzle: SolarEclipsePuzzle = {
  status: "prototype",
  title: "Make the Sun disappear",
  goalTopicId: "solar-eclipse",
  topics: [
    {
      id: "light-shadow",
      name: "Light & shadow",
      description:
        "Light travels in straight lines. An object in its path casts a shadow",
    },
    {
      id: "earth-moon-sun",
      name: "Earth, Moon & Sun",
      description: "The three bodies differ in scale, position and movement",
    },
    {
      id: "shadow-cone",
      name: "The Moon's shadow",
      description:
        "Umbra and penumbra form behind the Moon when sunlight is blocked",
    },
    {
      id: "orbital-motion",
      name: "Orbital motion",
      description:
        "Earth travels around the Sun while the Moon travels around Earth",
    },
    {
      id: "alignment",
      name: "Alignment",
      description:
        "An eclipse becomes possible when the three bodies occupy one line",
    },
    {
      id: "solar-eclipse",
      name: "Solar eclipse",
      description:
        "The Moon passes between Earth and the Sun and its shadow reaches Earth",
    },
  ],
  dependencies: [
    { topicId: "shadow-cone", prerequisiteId: "light-shadow" },
    { topicId: "orbital-motion", prerequisiteId: "earth-moon-sun" },
    { topicId: "alignment", prerequisiteId: "shadow-cone" },
    { topicId: "alignment", prerequisiteId: "orbital-motion" },
    { topicId: "solar-eclipse", prerequisiteId: "alignment" },
  ],
  views: [
    {
      id: "starting-fresh",
      label: "Nothing yet",
      knownTopicIds: [],
      journeyTopicIds: [
        "light-shadow",
        "earth-moon-sun",
        "shadow-cone",
        "orbital-motion",
        "alignment",
        "solar-eclipse",
      ],
      reading:
        "Both foundation branches are needed before they meet at alignment",
    },
    {
      id: "known-foundations",
      label: "Light, shadow & the three bodies",
      knownTopicIds: ["light-shadow", "earth-moon-sun"],
      journeyTopicIds: [
        "shadow-cone",
        "orbital-motion",
        "alignment",
        "solar-eclipse",
      ],
      reading:
        "The foundations are known. The route begins with shadow geometry and orbital motion",
    },
    {
      id: "known-mechanics",
      label: "Shadow cones & orbital motion",
      knownTopicIds: [
        "light-shadow",
        "earth-moon-sun",
        "shadow-cone",
        "orbital-motion",
      ],
      journeyTopicIds: ["alignment", "solar-eclipse"],
      reading:
        "Only alignment remains between the learner's current knowledge and the goal",
    },
  ],
};
