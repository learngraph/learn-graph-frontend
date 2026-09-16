import type { NodeContent } from "../../../content/graph";

export const impactContent = {
  id: "content-about-impact",
  publicationStatus: "review",
  layout: "impact",
  title: "What matters is what changed once LearnGraph entered the room.",
  sourceRefs: [
    "https://learngraph.org/schools/success-stories/bildungszentrum-optimum",
    "Deployed legacy website successStories.itech content object",
  ],
  blocks: [
    {
      type: "prose",
      paragraphs: [
        "Sometimes change shows up in a learner surprised by how well learning worked for them.",
        "It can also show up behind the scenes, when an educator prepares learning material for a mixed group with different needs far more easily than expected.",
      ],
    },
    {
      type: "case-studies",
      reviewNote:
        "Migrated from the deployed legacy website. Editorial pruning and publication review remain separate work.",
      cases: [
        {
          id: "itech",
          partner: "ITECH Hamburg",
          kicker: "Vocational school · Hamburg",
          title: "The learning path becomes visible. More room for personal mentoring",
          teaser:
            "Visible learning paths and more room for mentoring—evidence of competence, not only grades.",
          lede:
            "At ITECH vocational school in Hamburg, a teacher describes LearnGraph as a layer that pre-structures orientation: teachers repeat less baseline navigation and reach individual mentoring faster—where teaching actually lands.",
          websiteUrl: "https://www.itech-bs14.de/",
          websiteLabel: "ITECH Hamburg",
          sections: [
            {
              type: "prose",
              paragraphs: [
                "ITECH vocational school in Hamburg is a vocational school like any other: dual training, different starting points, and the daily squeeze between expectations and limited time. LearnGraph’s value is not a headcount—it is visible learning paths and teachers gaining room to teach the way they want to.",
              ],
            },
            {
              type: "quote",
              text: "The path isn’t clear for many people—the individual steps it takes to get there—LearnGraph shows it visually in seconds, without a long explanation.",
              attribution: "Teacher, ITECH vocational school, Hamburg",
            },
            {
              type: "prose",
              paragraphs: [
                "LearnGraph is the shared, legible route from a goal to sensible next steps. Teachers do not have to rebuild that baseline orientation in every conversation—the system carries structure and transparency. The same lesson time yields more space for what matters pedagogically: listening, precise questions, working on real blockers.",
              ],
            },
            {
              type: "quote",
              text: "It takes the work off my plate—picking everyone up exactly where they are.",
              attribution: "Teacher, ITECH vocational school, Hamburg",
            },
            {
              type: "prose",
              paragraphs: [
                "That shifts the centre of gravity toward personal support: less endless locating, more individual help exactly where learners stand. Teachers can move into mentoring sooner—with time invested where it moves people forward.",
                "Over time, documented work becomes a growing picture of competence: tasks, evidence, and progress become visible beyond a single mark—useful for exams, conversations with training companies, and transitions where evidence tells more than one grade alone.",
              ],
            },
            {
              type: "quote",
              text: "My own LearnGraph—from it grows a personal portfolio, far better than any school grade.",
              attribution: "Teacher, ITECH vocational school, Hamburg",
            },
          ],
        },
        {
          id: "bildungszentrum-optimum",
          partner: "Bildungszentrum Optimum",
          kicker: "Tutoring & learning centre",
          title: "Systemic quality, not market luck. Children first, not revenue",
          teaser:
            "Structured support with clear learning paths—visible to mentors, learners, and families.",
          lede:
            "Efecan Köse founded Bildungszentrum Optimum with two partners: an organisation where children and systemic quality come first.",
          websiteUrl: "https://www.bildungszentrumoptimum.org/",
          websiteLabel: "Bildungszentrum Optimum",
          sections: [
            {
              type: "prose",
              paragraphs: [
                "Bildungszentrum Optimum grew from hard inside experience: Efecan Köse and two partners saw in another tutoring setting how a single child can vanish between oversized groups and too many levels in one room. The insight that stings: there, quality is not a principle—it is luck when the right educator happens to be at the front, not because of the organisation. Children pay for that. That is why the centre exists.",
                "Efecan does not treat tutoring as a last stop, but as a chance to grasp missing building blocks—training, not stigma, including for children broadly keeping up at school. The three had already taught that way: closer, more human, not by rote; parents and children felt it. The question became unavoidable: if another way is already possible—why not build it ourselves? Before incorporating, less “one more offer” than: if we mean “better”, what does that mean? Answer: subject alone is not enough; what matters is whether someone can teach—humour, empathy, presence. “Exchange matters more to me,” says Efecan—almost the whole concept in one line.",
                "Structurally, much still felt like decades ago: mixed group, frontal, worksheet, move on. They wanted learning as teamwork—work it out together, mistakes, same wavelength. Educators should bring orientation and personality; some children need ten minutes of talk first—not a sideshow, but the work.",
                "The second, sharper lesson came from those rooms: quality circles, city, certificates—lots about money, rules, responsibilities; too little about what is happening in the lesson? what helps children? Formal criteria exist, “fine,” says Efecan—but how tutoring actually looks stays with operators, and there it often stays the same. The frightening truth: quality is not built systematically in this market; the gap often only shows where individuals excel—not outside snark, but the view from the same meetings.",
                "That is where something tipped: if good tutoring only works because the right person happens to be at the front, it is not a viable system—a blind spot children suffer under. The founding idea: no hero rescues a broken system; the organisation must be built so quality grows from selection, stance, relationship, truly walking with the child—help toward self-reliance, teamwork. Families feel it: progress, relationships, teaching that lands differently.",
                "The open question for Efecan is still how to show, outwardly, that you are genuinely better—when what matters most lives in relationship, pedagogy, and stance, not in something you can hand over like a product. Personalisation happens between people; it is hard to “touch.”",
              ],
            },
            {
              type: "quote",
              text: "How do I know it works, what we are doing?",
              attribution: "Efecan, Bildungszentrum Optimum",
            },
            {
              type: "prose",
              paragraphs: [
                "LearnGraph does not replace relationship or stance—but it does more than make the invisible visible: it helps the centre deliver what it already stands for—full personalisation instead of one-size-fits-all teaching dressed up as care. Clear entry points, next steps, and coherent tasks and materials create the follow-up many tutoring models lack; at the same time, they lighten the load day to day so no one has to perform the same lesson for everyone at once when the needs differ. That makes quality more systematic and still human.",
              ],
            },
            {
              type: "quote",
              text: "We have just revolutionised tutoring, because the problem with tutoring is follow-up.",
              attribution: "Efecan, Bildungszentrum Optimum",
            },
            {
              type: "prose",
              paragraphs: [
                "Picture fourth-grade German: three learners arrive from very different homes and habits, yet they share similar struggles. One learning assistant is meant to pick all of them up—but the gaps are not identical. One needs confidence in reading, another in writing, the third needs small, doable wins to rebuild trust. Everyone should start together, yet no one should be left waiting.",
                "With LearnGraph the start feels personal immediately: each learner sees where they begin and what makes sense next. Tasks and materials stay traceable as one story instead of disappearing across scraps of paper or chat threads. The assistant spends less time distributing and sorting, and gains time for what matters most: listening, encouraging, asking the right follow-up questions.",
              ],
            },
            {
              type: "quote",
              text: "Because how much more individualised could you even make it?",
              attribution: "Efecan, Bildungszentrum Optimum",
            },
            {
              type: "prose",
              paragraphs: [
                "For the centre, that means what they already live at the core—systemic quality and real relationship with children—becomes legible for teams, families, and partners. Not paperwork for its own sake, but making visible what long stayed invisible: how children are held, move forward, and regain trust.",
              ],
            },
          ],
        },
      ],
    },
  ],
} as const satisfies NodeContent;
