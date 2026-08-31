import { CourseCatalogEntry, CohortConfig } from '../types'

export const COURSE_CATALOGUE: CourseCatalogEntry[] = [
  { code: 'MM 801', title: 'HCI and Applications', description: 'Human-computer interaction principles applied to multimedia systems, with an industry-linked design project.' },
  { code: 'MM 802', title: 'Multimedia Communications', description: 'Delivery and streaming of multimedia content across networks.' },
  { code: 'MM 803', title: 'Image and Video Processing', description: 'Core techniques for processing, compressing, and analyzing visual media.' },
  { code: 'MM 804', title: 'Graphics and Animation', description: 'Computer graphics pipelines and animation techniques for interactive media.' },
  { code: 'MM 805', title: 'Computer Vision and 3DTV', description: 'Vision algorithms and 3D video capture/display technologies.' },
  { code: 'MM 806', title: 'Virtual Reality and Tele-Presence', description: 'Immersive systems, VR interaction, and remote presence technology.' },
  { code: 'MM 811', title: 'AI in Multimedia', description: 'Applied machine learning techniques for multimedia analysis and generation.' },
  { code: 'MM 812', title: 'Multimedia Topic', description: 'Special topics course, content varies by cohort and instructor.' },
]

// Admin sets which six of the eight catalogue courses apply to a given cohort.
// This is intentionally data-driven rather than hard-coded to one schedule.
export const CURRENT_COHORT_CONFIG: CohortConfig = {
  cohortName: 'Fall 2026',
  activeCourseCodes: ['MM 801', 'MM 802', 'MM 803', 'MM 804', 'MM 805', 'MM 811'],
}

export const INTERNSHIP_COURSES = [
  { code: 'MM 807', title: 'Multimedia Internship Project I', credits: 9, term: 3 },
  { code: 'MM 808', title: 'Multimedia Internship Project II', credits: 9, term: 4 },
]

export const SUPPLEMENTARY_COURSES = [
  { code: 'MM 809', title: 'Supplementary Internship Project I' },
  { code: 'MM 810', title: 'Supplementary Internship Project II' },
]

export const ADMISSION_CALENDAR = {
  intake: 'Fall',
  applicationsOpen: 'October 1',
  internationalDeadline: 'January 31',
  notificationsBegin: 'March',
  domesticLateDeadline: 'July 31 (domestic applicants not requiring a study visa, after contacting the MM administrator)',
}
