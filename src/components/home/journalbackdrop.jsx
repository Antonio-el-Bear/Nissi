import React from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const TONE_STYLES = {
  '#1A0F2E': {
    '--journal-glow-a': 'rgba(247, 201, 119, 0.045)',
    '--journal-glow-b': 'rgba(197, 180, 255, 0.085)',
    '--journal-glow-c': 'rgba(134, 239, 172, 0.05)',
    '--journal-rule': 'rgba(255, 248, 234, 0.034)',
    '--journal-rule-vertical': 'rgba(134, 239, 172, 0.03)',
    '--journal-ink-a': 'rgba(197, 180, 255, 0.14)',
    '--journal-ink-b': 'rgba(134, 239, 172, 0.1)',
    '--journal-ink-c': 'rgba(247, 201, 119, 0.08)',
    '--journal-note': 'rgba(252, 246, 238, 0.12)',
    '--journal-note-line': 'rgba(252, 246, 238, 0.08)',
  },
  '#1E0B45': {
    '--journal-glow-a': 'rgba(197, 180, 255, 0.06)',
    '--journal-glow-b': 'rgba(124, 58, 237, 0.13)',
    '--journal-glow-c': 'rgba(233, 213, 255, 0.05)',
    '--journal-rule': 'rgba(233, 213, 255, 0.038)',
    '--journal-rule-vertical': 'rgba(124, 58, 237, 0.04)',
    '--journal-ink-a': 'rgba(197, 180, 255, 0.18)',
    '--journal-ink-b': 'rgba(109, 40, 217, 0.12)',
    '--journal-ink-c': 'rgba(247, 201, 119, 0.06)',
    '--journal-note': 'rgba(244, 238, 254, 0.12)',
    '--journal-note-line': 'rgba(244, 238, 254, 0.08)',
  },
  '#061F1F': {
    '--journal-glow-a': 'rgba(134, 239, 172, 0.05)',
    '--journal-glow-b': 'rgba(13, 148, 136, 0.11)',
    '--journal-glow-c': 'rgba(197, 180, 255, 0.05)',
    '--journal-rule': 'rgba(225, 255, 245, 0.032)',
    '--journal-rule-vertical': 'rgba(134, 239, 172, 0.036)',
    '--journal-ink-a': 'rgba(134, 239, 172, 0.13)',
    '--journal-ink-b': 'rgba(13, 148, 136, 0.14)',
    '--journal-ink-c': 'rgba(197, 180, 255, 0.06)',
    '--journal-note': 'rgba(236, 255, 247, 0.1)',
    '--journal-note-line': 'rgba(236, 255, 247, 0.075)',
  },
  '#150B2E': {
    '--journal-glow-a': 'rgba(233, 213, 255, 0.055)',
    '--journal-glow-b': 'rgba(109, 40, 217, 0.12)',
    '--journal-glow-c': 'rgba(134, 239, 172, 0.04)',
    '--journal-rule': 'rgba(246, 236, 255, 0.034)',
    '--journal-rule-vertical': 'rgba(197, 180, 255, 0.03)',
    '--journal-ink-a': 'rgba(233, 213, 255, 0.15)',
    '--journal-ink-b': 'rgba(109, 40, 217, 0.12)',
    '--journal-ink-c': 'rgba(247, 201, 119, 0.05)',
    '--journal-note': 'rgba(248, 241, 255, 0.115)',
    '--journal-note-line': 'rgba(248, 241, 255, 0.08)',
  },
  '#081525': {
    '--journal-glow-a': 'rgba(247, 201, 119, 0.055)',
    '--journal-glow-b': 'rgba(13, 148, 136, 0.08)',
    '--journal-glow-c': 'rgba(197, 180, 255, 0.04)',
    '--journal-rule': 'rgba(253, 248, 240, 0.03)',
    '--journal-rule-vertical': 'rgba(247, 201, 119, 0.03)',
    '--journal-ink-a': 'rgba(247, 201, 119, 0.13)',
    '--journal-ink-b': 'rgba(134, 239, 172, 0.08)',
    '--journal-ink-c': 'rgba(197, 180, 255, 0.06)',
    '--journal-note': 'rgba(255, 247, 230, 0.11)',
    '--journal-note-line': 'rgba(255, 247, 230, 0.075)',
  },
  '#0D0720': {
    '--journal-glow-a': 'rgba(247, 201, 119, 0.04)',
    '--journal-glow-b': 'rgba(124, 58, 237, 0.085)',
    '--journal-glow-c': 'rgba(134, 239, 172, 0.035)',
    '--journal-rule': 'rgba(252, 246, 238, 0.025)',
    '--journal-rule-vertical': 'rgba(217, 119, 6, 0.03)',
    '--journal-ink-a': 'rgba(247, 201, 119, 0.11)',
    '--journal-ink-b': 'rgba(124, 58, 237, 0.09)',
    '--journal-ink-c': 'rgba(134, 239, 172, 0.05)',
    '--journal-note': 'rgba(252, 246, 238, 0.095)',
    '--journal-note-line': 'rgba(252, 246, 238, 0.068)',
  },
};

const JOURNAL_SCENES = {
  '#1A0F2E': {
    kicker: 'Arrival',
    title: 'Find Your Way Back to You',
    fragments: ['healing', 'growth', 'reconnection'],
    notes: [
      {
        id: 'arrival-1',
        text: 'I am learning to hold my life more gently.',
        top: '12%',
        left: '8%',
        rotate: -7,
        width: '260px',
        opacity: 0.98,
      },
      {
        id: 'arrival-2',
        text: 'Some healing arrives quietly, one honest page at a time.',
        top: '34%',
        right: '7%',
        rotate: 5,
        width: '280px',
        opacity: 0.9,
      },
      {
        id: 'arrival-3',
        text: 'The story is still being written, but it already feels softer.',
        top: '76%',
        right: '10%',
        rotate: 6,
        width: '300px',
        opacity: 0.84,
      },
    ],
  },
  '#1E0B45': {
    kicker: 'For You',
    title: 'Individual Therapy',
    fragments: ['inner world', 'no judgment', 'presence'],
    notes: [
      {
        id: 'individual-1',
        text: 'Today I noticed the anxiety before it became the whole room.',
        top: '16%',
        right: '9%',
        rotate: 4,
        width: '290px',
        opacity: 0.96,
      },
      {
        id: 'individual-2',
        text: 'No judgment. Just presence. That was enough for me to finally speak honestly.',
        top: '42%',
        left: '7%',
        rotate: -6,
        width: '320px',
        opacity: 0.88,
      },
      {
        id: 'individual-3',
        text: 'Maybe self-understanding can feel like coming home slowly.',
        top: '72%',
        right: '13%',
        rotate: 5,
        width: '250px',
        opacity: 0.8,
      },
    ],
  },
  '#061F1F': {
    kicker: 'For Two',
    title: 'Couples Therapy',
    fragments: ['trust', 'communication', 'bond'],
    notes: [
      {
        id: 'couples-1',
        text: 'We are practicing communication without treating honesty like a threat.',
        top: '14%',
        left: '9%',
        rotate: -5,
        width: '300px',
        opacity: 0.96,
      },
      {
        id: 'couples-2',
        text: 'Trust does not return all at once. It returns in smaller, braver moments.',
        top: '46%',
        right: '6%',
        rotate: 6,
        width: '315px',
        opacity: 0.88,
      },
      {
        id: 'couples-3',
        text: 'Tonight we remembered the bond is not gone. It just needs tending.',
        top: '74%',
        left: '12%',
        rotate: -3,
        width: '270px',
        opacity: 0.8,
      },
    ],
  },
  '#150B2E': {
    kicker: 'Reclaiming Safety',
    title: 'Trauma & PTSD Healing',
    fragments: ['safety first', 'trauma-informed', 'not your wounds'],
    notes: [
      {
        id: 'trauma-1',
        text: 'I felt the old alarm rise, and this time I stayed with my breath.',
        top: '18%',
        right: '8%',
        rotate: 5,
        width: '300px',
        opacity: 0.95,
      },
      {
        id: 'trauma-2',
        text: 'Safety first sounded impossible at first. Today my body argued a little less.',
        top: '41%',
        left: '8%',
        rotate: -7,
        width: '325px',
        opacity: 0.88,
      },
      {
        id: 'trauma-3',
        text: 'The past is still there, but it is no longer the only voice in the room.',
        top: '73%',
        right: '12%',
        rotate: 4,
        width: '305px',
        opacity: 0.8,
      },
    ],
  },
  '#081525': {
    kicker: 'Growing Minds',
    title: 'Children & Students',
    fragments: ['academic pressure', 'emotions', 'development'],
    notes: [
      {
        id: 'students-1',
        text: 'Academic pressure keeps making everything feel urgent, even when it is not.',
        top: '16%',
        left: '8%',
        rotate: -6,
        width: '320px',
        opacity: 0.94,
      },
      {
        id: 'students-2',
        text: 'There are kinder ways to carry growing up than pretending it weighs nothing.',
        top: '45%',
        right: '7%',
        rotate: 5,
        width: '310px',
        opacity: 0.86,
      },
      {
        id: 'students-3',
        text: 'Maybe emotional development is allowed to be messy and still be progress.',
        top: '74%',
        left: '13%',
        rotate: -4,
        width: '280px',
        opacity: 0.8,
      },
    ],
  },
  '#0D0720': {
    kicker: 'Next Step',
    title: 'Begin Your Journey',
    fragments: ['complimentary consult', 'mon-fri', 'connection'],
    notes: [
      {
        id: 'closing-1',
        text: 'I think I am ready to begin before I feel fully ready.',
        top: '20%',
        right: '9%',
        rotate: 4,
        width: '270px',
        opacity: 0.92,
      },
      {
        id: 'closing-2',
        text: 'Hope did not arrive loudly. It arrived as a next step I could finally name.',
        top: '52%',
        left: '8%',
        rotate: -6,
        width: '315px',
        opacity: 0.84,
      },
      {
        id: 'closing-3',
        text: 'Healing through connection sounds simple. Today it felt true.',
        top: '78%',
        right: '11%',
        rotate: 5,
        width: '250px',
        opacity: 0.76,
      },
    ],
  },
};

export default function JournalBackdrop({ currentTone = '#1A0F2E' }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const paperY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-10%']);
  const notesLayerY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-12%']);
  const notesLayerRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0deg', '0deg'] : ['0deg', '0.8deg']);
  const lineY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-18%']);
  const inkY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-20%']);
  const inkOpacity = useTransform(scrollYProgress, [0, 0.35, 1], shouldReduceMotion ? [0.06, 0.06, 0.06] : [0.06, 0.12, 0.085]);
  const toneStyle = TONE_STYLES[currentTone] || TONE_STYLES['#1A0F2E'];
  const activeScene = JOURNAL_SCENES[currentTone] || JOURNAL_SCENES['#1A0F2E'];

  return (
    <div className="journal-backdrop" aria-hidden="true" style={toneStyle}>
      <motion.div className="journal-paper-glow" style={{ y: paperY }} />
      <motion.div className="journal-rule-layer" style={{ y: lineY }} />
      <motion.div className="journal-ink-sweep" style={{ y: inkY, opacity: inkOpacity }} />
      <motion.div className="journal-notes-layer" style={{ y: notesLayerY, rotate: notesLayerRotate }}>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentTone}
            className="journal-scene"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
          >
            <motion.div
              className="journal-scene-meta"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
            >
              <span className="journal-scene-kicker">{activeScene.kicker}</span>
              <strong className="journal-scene-title">{activeScene.title}</strong>
              <span className="journal-scene-fragments">{activeScene.fragments.join(' · ')}</span>
            </motion.div>
            {activeScene.notes.map((note, index) => (
              <motion.div
                key={note.id}
                className="journal-note"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.97, rotate: note.rotate - 1.5 }}
                animate={{ opacity: note.opacity, y: 0, scale: 1, rotate: note.rotate }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98, rotate: note.rotate + 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  top: note.top,
                  left: note.left,
                  right: note.right,
                  width: note.width,
                }}
              >
                <span>{note.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}