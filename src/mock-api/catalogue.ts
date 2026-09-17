import { CourseCatalogEntry, CohortConfig } from '../types'

// Sourced from the official MM Program site (mmgrad.org) and the UofA course
// catalogue, Sept 2026.
export const COURSE_CATALOGUE: CourseCatalogEntry[] = [
  { code: 'MM 801', title: 'HCI and Applications', description: 'How humans and computers interact with multimedia data (image, video, 3D, sound). Covers computer-vision and image-processing techniques for human-centric interactive applications, including gesture and multi-touch interaction and perceptual-response study methods.' },
  { code: 'MM 802', title: 'Multimedia Communications', description: 'Encoding, synchronization, scheduling, and delivery of multimedia content across networks. Focuses on achieving Quality of Service and Quality of Experience over both reliable and unreliable networks, including real-time applications.' },
  { code: 'MM 803', title: 'Image and Video Processing', description: 'The image/video processing pipeline from capture to final display. Covers core image-processing concepts, encoding standards including HEVC, and quality-assessment metrics.' },
  { code: 'MM 804', title: 'Graphics and Animation', description: 'Graphics and animation techniques for entertainment, advertising, education, and surgical training/planning. Covers 3D data acquisition, processing, transmission, rendering, modeling, and special effects.' },
  { code: 'MM 805', title: 'Computer Vision and 3DTV', description: 'Stereoscopic and multi-view 3D video technology, including techniques inherited from 2D video and computer vision, and the 3D components of the HEVC standard. Literature-review and seminar-style format.' },
  { code: 'MM 806', title: 'Virtual Reality and Tele-Presence', description: 'Building immersive, user-friendly VR/AR environments for training, design, rehabilitation, and scientific visualization, including haptic and head-mounted-display interaction and tele-presence for remote/mobile users.' },
  { code: 'MM 811', title: 'AI in Multimedia', description: 'A multimedia topics course reflecting current industry R&D trends in applied AI.' },
  { code: 'MM 812', title: 'Multimedia Topic', description: 'A multimedia topics course reflecting current industry R&D trends; content varies by offering.' },
]

// MM 801–806 are the standard six mandatory courses (three per term across
// Term 1 and Term 2). Admin can still substitute in MM 811/812 for a given
// cohort, since course offerings can vary — this stays data-driven rather
// than hard-coded to one schedule.
export const CURRENT_COHORT_CONFIG: CohortConfig = {
  cohortName: 'Fall 2026',
  activeCourseCodes: ['MM 801', 'MM 802', 'MM 803', 'MM 804', 'MM 805', 'MM 806'],
}

export const INTERNSHIP_COURSES = [
  { code: 'MM 807', title: 'Multimedia Internship Project I', credits: 9, term: 3 },
  { code: 'MM 808', title: 'Multimedia Internship Project II', credits: 9, term: 4 },
]

export const SUPPLEMENTARY_COURSES = [
  { code: 'MM 809', title: 'Multimedia Supplementary Internship Project', credits: 3 },
  { code: 'MM 810', title: 'Multimedia Supplementary Internship Project', credits: 6 },
]

export const ADMISSION_CALENDAR = {
  intake: 'Fall',
  applicationsOpen: 'October 1',
  internationalDeadline: 'January 31',
  notificationsBegin: 'March',
  domesticLateDeadline: 'July 31 (domestic applicants not requiring a study visa — email csmmadm@ualberta.ca before July 31)',
}

export const ADMISSION_REQUIREMENTS = {
  degree: 'A four-year undergraduate degree (or equivalent) in Computing Science, Computer Engineering, or a related Science/Engineering field',
  gpa: 'Minimum 3.0 GPA (on a 4.0 scale) in the last two years of prior study',
  programming: 'Undergraduate-level programming (e.g. C/C++, C#, OpenGL, MATLAB, Java, or Python) — script languages alone (PHP, JavaScript) are not sufficient',
}

export const PROGRAM_FACTS = {
  totalCredits: 36,
  courseCredits: 18,
  internshipCredits: 18,
  minGpaToGraduate: 2.7,
  minTermGpa: 3.0,
  minCourseGrade: 'B-',
  fullTimeCreditsPerTerm: 9,
  typicalLength: '2 years',
  maxLength: '4 years',
}