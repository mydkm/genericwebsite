#import "@preview/basic-resume:0.2.9": *

// Put your personal information here, replacing mine
#let name = "Joshua Davidov"
#let location = "Manhattan, NY"
#let email = "joshua.davidov@cooper.edu"
#let github = "github.com/mydkm"
#let linkedin = "linkedin.com/in/josh-davidov"
#let phone = "+1 (929) 301-1803"
#let personal-site = "TBD"
#let institution = "The Cooper Union for the Advancement of Science and Art"

#show: resume.with(
  author: name,
  // All the lines below are optional. 
  // For example, if you want to to hide your phone number:
  // feel free to comment those lines out and they will not show.
  location: location,
  email: email,
  phone: phone,
  personal-site: linkedin,
  accent-color: "#000000", //default: #26428b
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: center,
  personal-info-position: center,
)

/*
* Lines that start with == are formatted into section headings
* You can use the specific formatting functions if needed
* The following formatting functions are listed below
* #edu(dates: "", degree: "", gpa: "", institution: "", location: "")
* #work(company: "", dates: "", location: "", title: "")
* #project(dates: "", name: "", role: "", url: "")
* #extracurriculars(activity: "", dates: "")
* There are also the following generic functions that don't apply any formatting
* #generic-two-by-two(top-left: "", top-right: "", bottom-left: "", bottom-right: "")
* #generic-one-by-two(left: "", right: "")
*/
== Education

#edu(
  institution: institution,
  location: location,
  dates: dates-helper(start-date: "September 2024", end-date: "May 2028"),
  degree: "Mechanical Engineering B.E.",
)
- Cumulative GPA: 3.23\/4.00 | Half Tuition Scholarship Recipient, Innovator Scholarship Recipient
- Relevant Coursework: The Evolving Universe, Remote Sensing Image Acquisition: Analysis and Application, Engineering Design and Problem Solving, Engineering Graphics, Principles of Design, Discrete Math, Linear Algebra, Differential Equations, Statics, Dynamics, Material Science, Introduction to Computer Science

/*
move around classes as necessary
*/

== Project Experience

#work(
  title: "Researcher",
  location: location,
  company: "Mililab, Custom 3D Cast",
  dates: dates-helper(start-date: "June 2025", end-date: "Present"),
)
- Designing and implementating a Python script to create a cast for any body part, ready for 3D printing with an input CAD model.
- Preparing scanned body parts for "meshification" using PyMeshLab, Blender Python API, NumPy, etc.
- Protoyping an open source mesh visualization and manipulation software using Figma and React Native.

#work(
  title: "Member",
  location: location,
  company: "Urban Infrastructure, Project TOAD",
  dates: dates-helper(start-date: "September 2024", end-date: "December 2024"),
)
- Engineering a compostion solution to prove a theory that oyster mushrooms can be utilized to break down forever plastics with a team of 5 engineers.
- Designed a piece of "living art" that accomodates specific substrates and their ideal growing conditions using Fusion360 and Solidworks.
- Presented our solution to the school in a yearly engineering design showcase.

#work(
  title: institution,
  location: dates-helper(start-date: "November 2025", end-date: "December 2025"),
  company: "Member, Suicide Burn Descent Simulator",
  dates: location,
)
- TBD

#work(
  title: institution,
  location: dates-helper(start-date: "November 2025", end-date: "December 2025"),
  company: "Member, 2D Finite Difference Solver",
  dates: location,
)
- TBD

== Professional Experience
#work(
  title: institution,
  location: dates-helper(start-date: "November 2025", end-date: "December 2025"),
  company: "Tour Guide",
  dates: location,
)
- TBD

== Leadership Experience


== Skills & Interests 

// ... more headers and stuff below
