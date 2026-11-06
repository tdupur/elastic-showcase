// Speaker notes, keyed by scene id (see `scenes` in App.jsx).
// say   = talk track, in speaking order
// doIt  = what to click / show on the audience screen
// watch = cautions: things not to claim
// minutes = target time for the scene

export const TOTAL_MINUTES = 15

export const NOTES = {
  'hero-static': {
    minutes: 1,
    say: [
      'Every SOC has the same quiet problem: not the alerts you catch, the ones you never get to.',
      'Today: an upcoming capability in Elastic Security called AlertZero. The goal is inbox zero for your alert queue.',
      'Say early: this is an upcoming technical preview. I am showing a direction, not a shipped product.',
    ],
    doIt: ['Stay on this slide while you introduce yourself.'],
    watch: ['No release date, pricing, or performance numbers exist for AlertZero. Do not quote any.'],
  },
  hero: {
    minutes: 0,
    say: ['Animated intro. Hidden by default. Use the same opening as the title slide.'],
    doIt: [],
    watch: [],
  },
  team: {
    minutes: 0,
    say: ['Introduce yourself and anyone with you. Driven by Settings.'],
    doIt: ['Skip if the team list is empty.'],
    watch: [],
  },
  agenda: {
    minutes: 0.5,
    say: ['Quick map of the next 15 minutes: the problem, what AlertZero is, a live-style walkthrough, then how much you can delegate.'],
    doIt: ['Tiles are clickable. Use them to jump if Q&A pulls you back to a topic.'],
    watch: [],
  },
  challenge: {
    minutes: 2,
    say: [
      'Alert volume and velocity keep growing, and attackers now use AI too.',
      'Detecting every signal is not enough if nothing connects them into one attack. The blog cites the Hugging Face incident.',
      'Teams ration coverage by headcount. The queue sets the priorities, and whatever is left ages out unexamined.',
      'That crowds out hunting and tuning: the work that would shrink the queue.',
      '"The queue decides what you look at. We want you to decide."',
    ],
    doIt: ['Let the six tiles land. Pick two to read aloud, not all six.'],
    watch: [],
  },
  'what-is-alertzero': {
    minutes: 2,
    say: [
      '"Four agents, one job each, and nothing in your environment changes without approval."',
      'Walk the tiles: Watch, Worker, Proposed Action, Investigation, Escalation, Autonomy.',
      'Lineage strip: AI Assistant 2023, Attack Discovery 2024, then Agent Builder and Workflows, now AlertZero.',
      'Community tie-in: the building blocks are things people can already use today.',
    ],
    doIt: ['Hover tiles for emphasis. Point at the lineage strip last.'],
    watch: ['Keep calling it an upcoming technical preview.'],
  },
  watches: {
    minutes: 2,
    say: [
      'Triage: connects related alerts and runs Attack Discovery.',
      'Hunt: uses threat research to look for evidence in your own telemetry.',
      'Detection: investigates noisy rules and coverage gaps.',
      'Forensics: examines endpoint activity and finds supported response actions.',
      'Key line: "They are not a pipeline." A hunt can start from new research, tuning from recurring false positives, forensics from a finding.',
    ],
    doIt: ['Click each of the four Watch tiles in turn. The detail panel changes.'],
    watch: [],
  },
  walkthrough: {
    minutes: 4,
    say: [
      '1. Proposed Actions are already waiting, grouped by Respond, Investigate, Configure.',
      '2. Investigation: Boston, then 39 minutes later a distant hosting network. Same session ID, no new MFA, an unsigned process touching browser session material. Looks like session replay.',
      '3. Ask follow-ups. Existing findings are the context.',
      '4. Decide: approve or decline host isolation via Elastic Defend. Decision and execution are logged separately.',
      '5. Escalate to the team. For sensitive cases you can choose never to invoke an agent.',
      '"Note it says VPNs, proxies, and bad geolocation still need ruling out. It proposes. You decide."',
    ],
    doIt: [
      'Click through steps 1 to 5 with the step buttons.',
      'End by offering the click-through demo on the last slide.',
    ],
    watch: ['This is the demo moment. Slow down here.'],
  },
  'beyond-triage': {
    minutes: 2,
    say: [
      'Hunt: works from threat research even when no alert has fired, then reports what it searched and found.',
      'Tuning: a legitimate admin tool keeps tripping a rule. The Watch proposes an exception with a diagnosis and backtest.',
      'Detection changes always need approval. If declined, the rule is unchanged.',
    ],
    doIt: ['Click the second tab (false positives into rule changes) to show the query and the caution box.'],
    watch: [
      'READ THE CAUTION BOX: 5 false positives dropping to 0 does not prove attack coverage is preserved.',
      'The ES|QL on screen is illustrative: the blog describes its shape, not exact field names.',
    ],
  },
  autonomy: {
    minutes: 2,
    say: [
      'Autonomy is set per Worker, because teams and task risks differ.',
      'Supervised triage can send a true positive straight to endpoint analysis. Inconclusive results still need a person.',
      'Supervised endpoint analysis is designed to allow isolation, process termination, and suspension without per-action approval.',
      'Detection changes always require approval.',
      '"You pick the trust level per task."',
    ],
    doIt: ['Toggle Triage vs Endpoint, then Manual vs Supervised.'],
    watch: ['The blog gives no detail on Assisted mode. If asked, say so.'],
  },
  'open-by-design': {
    minutes: 2,
    say: [
      'Any model: proprietary or open source.',
      'Same features on Elastic Cloud, self-managed, or fully air-gapped.',
      'Built on Agent Builder, Workflows, Attack Discovery, Elastic Defend, and ES|QL.',
      '"The open part here is your choice of model and where it runs."',
    ],
    doIt: ['Point at the "Built on" row: these exist today.'],
    watch: [
      'AlertZero is NOT described as open source. Do not claim it is.',
      'Open = model and deployment choice, plus the Agent Builder and Workflows foundation.',
    ],
  },
  'next-steps': {
    minutes: 1,
    say: [
      'Sign up for the technical preview, read the blog, explore Agent Builder, try the click-through demo.',
      '"Every alert gets an answer, and every consequential decision stays with you."',
      'Then open Q&A.',
    ],
    doIt: ['Launch the click-through demo if time allows. Back to Topics returns to the agenda.'],
    watch: ['Test the Navattic link and Wi-Fi before you start.'],
  },
}

export const FALLBACK_NOTE = { minutes: 0, say: ['No notes for this scene.'], doIt: [], watch: [] }
