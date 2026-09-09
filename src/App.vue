<template>
  <div class="career-app">

    <!-- ================= NAVBAR ================= -->

    <header class="navbar">

      <div class="nav-inner">

        <router-link to="/" class="brand">
          <span class="brand-mark">C</span>

          <span class="brand-text">
            CAREERA
          </span>
        </router-link>

        <nav class="desktop-nav">

          <router-link to="/" exact-active-class="active">
            Home
          </router-link>

          <router-link to="/jobs">
            Find Jobs
          </router-link>

          <router-link to="/companies">
            Companies
          </router-link>

          <router-link to="/dashboard">
            Dashboard
          </router-link>

        </nav>

        <div class="nav-actions">

          <router-link to="/saved" class="saved-nav">
            <span>♡</span>
            <b>{{ savedJobs.length }}</b>
          </router-link>

          <router-link to="/dashboard" class="profile-nav">
            <span class="profile-mini">M</span>
            <span class="profile-name">Maham</span>
          </router-link>

          <button
            class="mobile-menu-btn"
            @click="mobileOpen = !mobileOpen"
          >
            ☰
          </button>

        </div>

      </div>

      <div class="mobile-nav" v-if="mobileOpen">

        <router-link to="/" @click="mobileOpen = false">
          Home
        </router-link>

        <router-link to="/jobs" @click="mobileOpen = false">
          Find Jobs
        </router-link>

        <router-link to="/companies" @click="mobileOpen = false">
          Companies
        </router-link>

        <router-link to="/dashboard" @click="mobileOpen = false">
          Dashboard
        </router-link>

        <router-link to="/saved" @click="mobileOpen = false">
          Saved Jobs
        </router-link>

      </div>

    </header>


    <!-- ================= PAGE CONTENT ================= -->

    <main>
      <router-view
        :jobs="jobs"
        :companies="companies"
        :saved-jobs="savedJobs"
        :applications="applications"
        :toggle-save="toggleSave"
        :apply-job="applyJob"
        :view-job="viewJob"
      />
    </main>


    <!-- ================= GLOBAL JOB MODAL ================= -->

    <div
      class="modal-overlay"
      v-if="selectedJob"
      @click.self="selectedJob = null"
    >

      <div class="job-modal">

        <button
          class="modal-close"
          @click="selectedJob = null"
        >
          ×
        </button>

        <div class="modal-top">

          <div class="company-logo large">
            {{ selectedJob.company.charAt(0) }}
          </div>

          <div>
            <span class="small-label">
              {{ selectedJob.category }}
            </span>

            <h2>{{ selectedJob.title }}</h2>

            <p>
              {{ selectedJob.company }}
              · {{ selectedJob.location }}
            </p>
          </div>

        </div>


        <div class="job-highlight-row">

          <span>💰 {{ selectedJob.salary }}</span>
          <span>◉ {{ selectedJob.type }}</span>
          <span>◆ {{ selectedJob.experience }}</span>
          <span>↗ {{ selectedJob.remote }}</span>

        </div>


        <div class="modal-content">

          <div>

            <h3>About the role</h3>

            <p>
              {{ selectedJob.description }}
            </p>

            <h3>What you'll do</h3>

            <ul>
              <li v-for="item in selectedJob.responsibilities" :key="item">
                {{ item }}
              </li>
            </ul>

          </div>


          <aside class="apply-card">

            <span class="small-label">
              READY TO APPLY?
            </span>

            <h3>
              Take the next step.
            </h3>

            <button
              class="btn btn-maroon wide"
              @click="applyJob(selectedJob)"
            >
              Apply now →
            </button>

            <button
              class="save-large"
              @click="toggleSave(selectedJob)"
            >
              {{ isSaved(selectedJob.id) ? "♥ Saved" : "♡ Save job" }}
            </button>

          </aside>

        </div>

      </div>

    </div>


    <!-- ================= TOAST ================= -->

    <transition name="toast">

      <div class="toast-message" v-if="toast">
        {{ toast }}
      </div>

    </transition>


    <!-- ================= FOOTER ================= -->

    <footer class="footer">

      <div class="footer-top">

        <div class="footer-about">

          <router-link to="/" class="brand footer-brand">

            <span class="brand-mark">C</span>

            <span class="brand-text">
              CAREERA
            </span>

          </router-link>

          <p>
            Find meaningful work, discover ambitious companies
            and build the next chapter of your career.
          </p>

        </div>


        <div class="footer-column">

          <h4>For Candidates</h4>

          <router-link to="/jobs">
            Find Jobs
          </router-link>

          <router-link to="/saved">
            Saved Jobs
          </router-link>

          <router-link to="/dashboard">
            Applications
          </router-link>

          <router-link to="/dashboard">
            My Profile
          </router-link>

        </div>


        <div class="footer-column">

          <h4>For Employers</h4>

          <a href="#">Post a Job</a>
          <a href="#">Find Talent</a>
          <a href="#">Employer Dashboard</a>
          <a href="#">Pricing</a>

        </div>


        <div class="footer-column">

          <h4>Company</h4>

          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>

        </div>

      </div>


      <div class="footer-bottom">

        <span>
          © 2026 CAREERA
        </span>

        <span>
          Built for the next career move.
        </span>

        <div>
          Instagram · LinkedIn · X
        </div>

      </div>

    </footer>

  </div>
</template>


<script>
export default {
  name: "App",

  data() {
    return {
      mobileOpen: false,
      toast: "",
      selectedJob: null,

      savedJobs: [
        2,
        8
      ],

      applications: [
        {
          id: 1,
          job: "Senior Frontend Developer",
          company: "Northstar Labs",
          date: "Sep 04, 2026",
          stage: "Interview",
          progress: 70
        },
        {
          id: 2,
          job: "Product Designer",
          company: "Mono Studio",
          date: "Sep 02, 2026",
          stage: "Screening",
          progress: 40
        },
        {
          id: 3,
          job: "React Developer",
          company: "PixelHouse",
          date: "Aug 29, 2026",
          stage: "Applied",
          progress: 20
        }
      ],

      companies: [
        {
          id: 1,
          name: "Northstar Labs",
          industry: "Technology",
          openRoles: 24,
          location: "Remote · Global",
          logo: "N"
        },
        {
          id: 2,
          name: "Mono Studio",
          industry: "Design",
          openRoles: 12,
          location: "London · Hybrid",
          logo: "M"
        },
        {
          id: 3,
          name: "PixelHouse",
          industry: "Software",
          openRoles: 18,
          location: "Dubai · Hybrid",
          logo: "P"
        },
        {
          id: 4,
          name: "Aster Finance",
          industry: "Finance",
          openRoles: 9,
          location: "Singapore · On-site",
          logo: "A"
        },
        {
          id: 5,
          name: "Orbit Health",
          industry: "Healthcare",
          openRoles: 15,
          location: "Remote · US",
          logo: "O"
        },
        {
          id: 6,
          name: "Cobalt Systems",
          industry: "Enterprise",
          openRoles: 31,
          location: "New York · Hybrid",
          logo: "C"
        }
      ],

      jobs: [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "Northstar Labs",
          category: "Engineering",
          location: "Remote · Global",
          salary: "$95K – $125K",
          type: "Full-time",
          experience: "Senior",
          remote: "Remote",
          posted: "2h ago",
          featured: true,
          skills: ["React", "TypeScript", "Next.js"],
          description:
            "We're looking for a Senior Frontend Developer to help build polished, scalable experiences used by thousands of customers.",
          responsibilities: [
            "Build high-quality frontend experiences",
            "Collaborate closely with product and design",
            "Improve performance and accessibility",
            "Mentor engineers and contribute to frontend standards"
          ]
        },

        {
          id: 2,
          title: "Product Designer",
          company: "Mono Studio",
          category: "Design",
          location: "London · Hybrid",
          salary: "$70K – $95K",
          type: "Full-time",
          experience: "Mid-level",
          remote: "Hybrid",
          posted: "5h ago",
          featured: true,
          skills: ["Figma", "UX", "UI"],
          description:
            "Join a multidisciplinary team creating thoughtful digital products for global brands and ambitious startups.",
          responsibilities: [
            "Design user-centered product experiences",
            "Create wireframes and polished interfaces",
            "Work closely with engineers",
            "Participate in research and testing"
          ]
        },

        {
          id: 3,
          title: "React Developer",
          company: "PixelHouse",
          category: "Engineering",
          location: "Dubai · Hybrid",
          salary: "$55K – $78K",
          type: "Full-time",
          experience: "Mid-level",
          remote: "Hybrid",
          posted: "8h ago",
          featured: true,
          skills: ["React", "JavaScript", "CSS"],
          description:
            "PixelHouse is looking for a React Developer who enjoys turning thoughtful designs into fast, accessible interfaces.",
          responsibilities: [
            "Develop reusable React components",
            "Integrate APIs and frontend services",
            "Write maintainable frontend code",
            "Collaborate with designers and backend engineers"
          ]
        },

        {
          id: 4,
          title: "Data Analyst",
          company: "Aster Finance",
          category: "Data",
          location: "Singapore · On-site",
          salary: "$68K – $90K",
          type: "Full-time",
          experience: "Mid-level",
          remote: "On-site",
          posted: "1d ago",
          featured: false,
          skills: ["SQL", "Python", "Power BI"],
          description:
            "Help our team transform complex business data into meaningful insights that influence strategy and operations.",
          responsibilities: [
            "Analyze large datasets",
            "Build dashboards and reports",
            "Identify business trends",
            "Work with stakeholders to define metrics"
          ]
        },

        {
          id: 5,
          title: "Marketing Strategist",
          company: "Orbit Health",
          category: "Marketing",
          location: "Remote · US",
          salary: "$62K – $84K",
          type: "Full-time",
          experience: "Mid-level",
          remote: "Remote",
          posted: "1d ago",
          featured: false,
          skills: ["Marketing", "Content", "Analytics"],
          description:
            "Own campaigns and content strategy for a rapidly growing digital health platform.",
          responsibilities: [
            "Develop campaign strategies",
            "Manage content calendars",
            "Analyze campaign performance",
            "Coordinate with creative teams"
          ]
        },

        {
          id: 6,
          title: "Backend Engineer",
          company: "Cobalt Systems",
          category: "Engineering",
          location: "New York · Hybrid",
          salary: "$100K – $135K",
          type: "Full-time",
          experience: "Senior",
          remote: "Hybrid",
          posted: "2d ago",
          featured: false,
          skills: ["Node.js", "APIs", "SQL"],
          description:
            "Build reliable backend services powering enterprise products used by global teams.",
          responsibilities: [
            "Design backend services",
            "Build REST APIs",
            "Improve system reliability",
            "Work across product teams"
          ]
        },

        {
          id: 7,
          title: "UI Engineer",
          company: "Northstar Labs",
          category: "Engineering",
          location: "Remote · Europe",
          salary: "$72K – $96K",
          type: "Full-time",
          experience: "Mid-level",
          remote: "Remote",
          posted: "2d ago",
          featured: false,
          skills: ["Vue", "JavaScript", "SCSS"],
          description:
            "Craft refined user interfaces for next-generation collaborative products.",
          responsibilities: [
            "Build responsive user interfaces",
            "Collaborate with design teams",
            "Develop reusable components",
            "Maintain visual consistency"
          ]
        },

        {
          id: 8,
          title: "Product Manager",
          company: "Cobalt Systems",
          category: "Product",
          location: "Toronto · Hybrid",
          salary: "$88K – $116K",
          type: "Full-time",
          experience: "Senior",
          remote: "Hybrid",
          posted: "3d ago",
          featured: false,
          skills: ["Strategy", "Agile", "Product"],
          description:
            "Lead product initiatives from early discovery through launch and iteration.",
          responsibilities: [
            "Define product strategy",
            "Prioritize roadmap initiatives",
            "Coordinate cross-functional teams",
            "Use data to guide decisions"
          ]
        },

        {
          id: 9,
          title: "Machine Learning Engineer",
          company: "Orbit Health",
          category: "AI & Data",
          location: "Remote · Global",
          salary: "$110K – $145K",
          type: "Full-time",
          experience: "Senior",
          remote: "Remote",
          posted: "4d ago",
          featured: false,
          skills: ["Python", "ML", "PyTorch"],
          description:
            "Develop machine learning systems that power intelligent healthcare products.",
          responsibilities: [
            "Develop machine learning pipelines",
            "Train and evaluate models",
            "Collaborate with product teams",
            "Improve model quality and performance"
          ]
        },

        {
          id: 10,
          title: "UX Researcher",
          company: "Mono Studio",
          category: "Design",
          location: "Berlin · Hybrid",
          salary: "$58K – $80K",
          type: "Full-time",
          experience: "Mid-level",
          remote: "Hybrid",
          posted: "5d ago",
          featured: false,
          skills: ["Research", "UX", "Testing"],
          description:
            "Help us understand users deeply and turn research into product decisions.",
          responsibilities: [
            "Plan qualitative research",
            "Conduct interviews and usability tests",
            "Synthesize customer insights",
            "Share findings with product teams"
          ]
        }
      ]
    };
  },

  methods: {

    toggleSave(job) {

      if (this.savedJobs.includes(job.id)) {
        this.savedJobs = this.savedJobs.filter(
          id => id !== job.id
        );

        this.showToast("Removed from saved jobs");
        return;
      }

      this.savedJobs.push(job.id);
      this.showToast("Job saved to your list");
    },

    isSaved(id) {
      return this.savedJobs.includes(id);
    },

    viewJob(job) {
      this.selectedJob = job;
    },

    applyJob(job) {

      const exists = this.applications.some(
        application => application.job === job.title
      );

      if (!exists) {

        this.applications.unshift({
          id: Date.now(),
          job: job.title,
          company: job.company,
          date: "Today",
          stage: "Applied",
          progress: 20
        });

      }

      this.selectedJob = null;

      this.showToast("Application submitted successfully ✓");

      this.$router.push("/dashboard");
    },

    showToast(message) {

      this.toast = message;

      clearTimeout(this.toastTimer);

      this.toastTimer = setTimeout(() => {
        this.toast = "";
      }, 2500);
    }

  }
};
</script>


<style lang="scss">

$maroon: #6f1d2a;
$maroon-dark: #50141f;
$charcoal: #272727;
$dark-grey: #454545;
$cream: #f6f4f1;
$warm-grey: #ece9e4;
$line: #dedad3;
$text: #252525;
$muted: #77736d;
$white: #ffffff;

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: $cream;
  color: $text;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Arial,
    sans-serif;
}

button,
input,
select,
textarea {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: inherit;
  text-decoration: none;
}


/* =============================
   NAVBAR
============================= */

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(246, 244, 241, 0.96);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid $line;
}

.nav-inner {
  max-width: 1360px;
  height: 78px;
  margin: 0 auto;
  padding: 0 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.brand-mark {
  width: 34px;
  height: 34px;
  background: $maroon;
  color: $white;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.brand-text {
  font-size: 16px;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.desktop-nav a {
  color: $muted;
  font-size: 12px;
  font-weight: 500;
}

.desktop-nav a:hover,
.desktop-nav a.active {
  color: $maroon;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.saved-nav {
  position: relative;
  color: $charcoal;
  font-size: 20px;
}

.saved-nav b {
  position: absolute;
  right: -9px;
  top: -8px;
  width: 16px;
  height: 16px;
  background: $maroon;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
}

.profile-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 13px;
  border-left: 1px solid $line;
}

.profile-mini {
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: $charcoal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
}

.profile-name {
  color: $charcoal;
  font-size: 11px;
}

.mobile-menu-btn {
  display: none;
  border: 0;
  background: transparent;
  font-size: 21px;
  color: $charcoal;
}

.mobile-nav {
  display: none;
}


/* =============================
   BUTTONS
============================= */

.btn {
  min-height: 48px;
  padding: 0 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  border: 1px solid transparent;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  cursor: pointer;
}

.btn-maroon {
  color: white;
  background: $maroon;
}

.btn-maroon:hover {
  background: $maroon-dark;
}

.btn-outline {
  color: $charcoal;
  border-color: $charcoal;
  background: transparent;
}

.btn-outline:hover {
  color: white;
  background: $charcoal;
}

.wide {
  width: 100%;
}


/* =============================
   HERO
============================= */

.hero {
  max-width: 1360px;
  margin: 0 auto;
  min-height: 690px;
  padding: 70px 35px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 70px;
}

.hero-kicker {
  color: $maroon;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.hero h1 {
  margin: 0;
  max-width: 690px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(64px, 7vw, 105px);
  line-height: 0.9;
  font-weight: 500;
  letter-spacing: -0.06em;
}

.hero h1 span {
  color: $maroon;
}

.hero-text {
  max-width: 520px;
  margin: 28px 0 35px;
  color: $muted;
  line-height: 1.8;
  font-size: 14px;
}

.hero-search {
  background: white;
  border: 1px solid $line;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 0.7fr auto;
  gap: 8px;
  box-shadow: 0 20px 45px rgba(58, 49, 39, 0.07);
}

.hero-search-field {
  min-width: 0;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-right: 1px solid $line;
}

.hero-search-field span {
  color: $muted;
  font-size: 17px;
}

.hero-search-field input {
  width: 100%;
  height: 42px;
  border: 0;
  outline: 0;
  font-size: 11px;
  color: $text;
}

.hero-search-field input::placeholder {
  color: #99948e;
}

.hero-visual {
  min-height: 555px;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(
      135deg,
      #d8cec4,
      #bdb0a5
    );
}

.hero-visual::before {
  content: "";
  position: absolute;
  width: 250px;
  height: 250px;
  right: -60px;
  top: -70px;
  border-radius: 50%;
  background: rgba(111,29,42,0.13);
}

.hero-visual::after {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  left: -130px;
  bottom: -150px;
  border-radius: 50%;
  background: rgba(39,39,39,0.11);
}

.hero-card {
  position: absolute;
  z-index: 2;
  left: 55px;
  right: 55px;
  bottom: 50px;
  background: white;
  padding: 24px;
  box-shadow: 0 25px 60px rgba(40, 32, 26, 0.18);
}

.hero-card-top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.hero-card-top strong {
  display: block;
  font-family: Georgia, serif;
  font-size: 21px;
  font-weight: 500;
}

.hero-card-top span {
  color: $muted;
  font-size: 10px;
  display: block;
  margin-top: 4px;
}

.company-logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $charcoal;
  color: white;
  font-weight: 800;
}

.company-logo.large {
  width: 62px;
  height: 62px;
  font-size: 20px;
}

.hero-job-meta {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.hero-job-meta span,
.job-tags span {
  padding: 7px 9px;
  background: $warm-grey;
  color: $dark-grey;
  font-size: 9px;
}

.hero-card-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-card-footer strong {
  color: $maroon;
  font-size: 13px;
}

.hero-card-footer small {
  color: $muted;
  font-size: 9px;
}


/* =============================
   TRUST STRIP
============================= */

.trust-strip {
  background: $charcoal;
  color: white;
}

.trust-inner {
  max-width: 1360px;
  margin: 0 auto;
  padding: 35px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.trust-item {
  padding: 0 30px;
  border-right: 1px solid #444;
}

.trust-item:first-child {
  padding-left: 0;
}

.trust-item:last-child {
  border-right: 0;
}

.trust-item strong {
  display: block;
  font-family: Georgia, serif;
  font-size: 29px;
  font-weight: 500;
}

.trust-item span {
  display: block;
  color: #aaa;
  margin-top: 5px;
  font-size: 10px;
}


/* =============================
   SECTION COMMON
============================= */

.section {
  max-width: 1360px;
  margin: 0 auto;
  padding: 100px 35px;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 45px;
}

.section-label {
  margin-bottom: 10px;
  color: $maroon;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(45px, 5vw, 70px);
  line-height: 0.94;
  font-weight: 500;
  letter-spacing: -0.05em;
}

.section-description {
  max-width: 430px;
  color: $muted;
  font-size: 12px;
  line-height: 1.8;
}


/* =============================
   CATEGORIES
============================= */

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.category-card {
  min-height: 200px;
  padding: 25px;
  position: relative;
  overflow: hidden;
  background: white;
  border: 1px solid $line;
  transition: 0.25s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: #c9c4bb;
}

.category-card:nth-child(1) {
  background: #e4ddd5;
}

.category-card:nth-child(2) {
  background: #dedfe0;
}

.category-card:nth-child(3) {
  background: #ddd7d0;
}

.category-card:nth-child(4) {
  background: #e2dedb;
}

.category-number {
  color: $muted;
  font-size: 9px;
}

.category-card h3 {
  margin: 50px 0 8px;
  font-size: 21px;
  font-weight: 500;
}

.category-card p {
  margin: 0;
  color: $muted;
  font-size: 10px;
}

.category-arrow {
  position: absolute;
  right: 24px;
  bottom: 21px;
  font-size: 20px;
}


/* =============================
   JOB CARDS
============================= */

.jobs-section {
  background: white;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.job-card {
  padding: 24px;
  background: $cream;
  border: 1px solid $line;
  transition: 0.25s ease;
}

.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(40, 35, 29, 0.08);
}

.job-card-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.job-card-company {
  display: flex;
  align-items: center;
  gap: 10px;
}

.job-card-company .company-logo {
  width: 40px;
  height: 40px;
  font-size: 12px;
}

.job-card-company span {
  color: $muted;
  font-size: 9px;
}

.save-button {
  width: 34px;
  height: 34px;
  border: 1px solid $line;
  background: white;
  color: $dark-grey;
  font-size: 18px;
}

.save-button.saved {
  color: $maroon;
}

.job-card h3 {
  margin: 20px 0 8px;
  font-size: 17px;
  line-height: 1.35;
  font-weight: 600;
}

.job-location {
  color: $muted;
  font-size: 10px;
}

.job-tags {
  margin-top: 20px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.job-card-bottom {
  margin-top: 25px;
  padding-top: 18px;
  border-top: 1px solid $line;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-card-bottom strong {
  color: $maroon;
  font-size: 12px;
}

.job-card-bottom button {
  color: $charcoal;
  padding: 0;
  background: transparent;
  border: 0;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
}


/* =============================
   FEATURED SPLIT
============================= */

.split-section {
  max-width: 1360px;
  margin: 0 auto;
  padding: 100px 35px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 30px;
}

.split-dark {
  min-height: 470px;
  padding: 55px;
  color: white;
  background: $charcoal;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.split-dark .section-label {
  color: #c99ba3;
}

.split-dark h2 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 57px;
  line-height: 0.95;
  font-weight: 500;
}

.split-dark p {
  max-width: 440px;
  margin: 22px 0;
  color: #aaa;
  line-height: 1.7;
  font-size: 12px;
}

.split-light {
  min-height: 470px;
  padding: 45px;
  background: $warm-grey;
}

.featured-job-row {
  padding: 20px 0;
  border-bottom: 1px solid #d1ccc4;
  display: flex;
  align-items: center;
  gap: 15px;
}

.featured-job-row .company-logo {
  width: 46px;
  height: 46px;
}

.featured-job-row-main {
  flex: 1;
}

.featured-job-row-main strong {
  font-size: 12px;
}

.featured-job-row-main span {
  display: block;
  margin-top: 4px;
  color: $muted;
  font-size: 9px;
}

.featured-job-row > span {
  color: $maroon;
  font-size: 10px;
}


/* =============================
   COMPANIES
============================= */

.company-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.company-card {
  padding: 25px;
  background: white;
  border: 1px solid $line;
}

.company-card-header {
  display: flex;
  align-items: center;
  gap: 13px;
}

.company-card-header h3 {
  margin: 0;
  font-size: 14px;
}

.company-card-header span {
  display: block;
  margin-top: 4px;
  color: $muted;
  font-size: 9px;
}

.company-card p {
  margin: 20px 0;
  color: $muted;
  font-size: 10px;
}

.company-card-footer {
  padding-top: 15px;
  border-top: 1px solid $line;
  display: flex;
  justify-content: space-between;
  color: $maroon;
  font-size: 9px;
  font-weight: 700;
}


/* =============================
   CTA
============================= */

.cta {
  max-width: 1360px;
  margin: 0 auto 100px;
  padding: 75px 60px;
  background: $maroon;
  color: white;
  text-align: center;
}

.cta h2 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: clamp(45px, 5vw, 73px);
  line-height: 0.95;
  font-weight: 500;
}

.cta p {
  max-width: 480px;
  margin: 20px auto 30px;
  color: rgba(255,255,255,0.78);
  font-size: 12px;
  line-height: 1.7;
}

.cta .btn {
  color: $maroon;
  background: white;
}


/* =============================
   FOOTER
============================= */

.footer {
  background: $charcoal;
  color: white;
}

.footer-top {
  max-width: 1360px;
  margin: 0 auto;
  padding: 75px 35px;
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 50px;
}

.footer-brand {
  color: white;
}

.footer-about p {
  max-width: 300px;
  color: #999;
  line-height: 1.7;
  font-size: 11px;
}

.footer-column h4 {
  margin: 0 0 18px;
  color: #8f8f8f;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.footer-column a {
  display: block;
  margin-bottom: 10px;
  color: #d7d7d7;
  font-size: 10px;
}

.footer-column a:hover {
  color: #c799a0;
}

.footer-bottom {
  border-top: 1px solid #3e3e3e;
  max-width: 1360px;
  margin: 0 auto;
  padding: 20px 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #777;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}


/* =============================
   JOB MODAL
============================= */

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  padding: 25px;
  background: rgba(30, 27, 24, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
}

.job-modal {
  width: min(980px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  background: $cream;
  box-shadow: 0 30px 90px rgba(0,0,0,0.3);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 17px;
  z-index: 3;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background: white;
  font-size: 25px;
  cursor: pointer;
}

.modal-top {
  padding: 42px;
  display: flex;
  align-items: center;
  gap: 18px;
  border-bottom: 1px solid $line;
}

.small-label {
  color: $maroon;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.modal-top h2 {
  margin: 7px 0;
  font-family: Georgia, serif;
  font-size: 42px;
  line-height: 1;
  font-weight: 500;
}

.modal-top p {
  margin: 0;
  color: $muted;
  font-size: 11px;
}

.job-highlight-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 22px 42px;
  border-bottom: 1px solid $line;
  color: $dark-grey;
  font-size: 10px;
}

.modal-content {
  padding: 42px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 45px;
}

.modal-content h3 {
  margin: 0 0 12px;
  font-family: Georgia, serif;
  font-size: 24px;
  font-weight: 500;
}

.modal-content p {
  color: $muted;
  font-size: 12px;
  line-height: 1.8;
  margin-bottom: 28px;
}

.modal-content ul {
  padding-left: 18px;
  color: $muted;
  font-size: 11px;
  line-height: 2;
}

.apply-card {
  padding: 26px;
  background: white;
  align-self: start;
  border: 1px solid $line;
}

.apply-card h3 {
  margin: 14px 0 24px;
  font-size: 27px;
}

.save-large {
  width: 100%;
  height: 45px;
  margin-top: 9px;
  background: transparent;
  border: 1px solid $line;
  color: $charcoal;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
}


/* =============================
   TOAST
============================= */

.toast-message {
  position: fixed;
  left: 50%;
  bottom: 25px;
  z-index: 300;
  transform: translateX(-50%);
  padding: 13px 18px;
  background: $charcoal;
  color: white;
  border-radius: 7px;
  box-shadow: 0 14px 35px rgba(0,0,0,0.2);
  font-size: 10px;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.22s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}


/* =============================
   RESPONSIVE
============================= */

@media (max-width: 1050px) {

  .hero {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 500px;
  }

  .jobs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .company-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .split-section {
    grid-template-columns: 1fr;
  }

  .footer-top {
    grid-template-columns: 1.5fr 1fr 1fr;
  }

  .footer-about {
    grid-column: 1 / -1;
  }
}


@media (max-width: 760px) {

  .nav-inner {
    height: 70px;
    padding: 0 18px;
  }

  .desktop-nav,
  .profile-name {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    border-top: 1px solid $line;
  }

  .mobile-nav a {
    padding: 15px 18px;
    border-bottom: 1px solid $line;
    color: $muted;
    font-size: 11px;
  }

  .mobile-nav a.router-link-exact-active {
    color: $maroon;
  }

  .hero,
  .section,
  .split-section {
    padding-left: 18px;
    padding-right: 18px;
  }

  .hero {
    padding-top: 60px;
    padding-bottom: 65px;
  }

  .hero h1 {
    font-size: 60px;
  }

  .hero-search {
    grid-template-columns: 1fr;
  }

  .hero-search-field {
    border-right: 0;
    border-bottom: 1px solid $line;
  }

  .hero-search .btn {
    width: 100%;
  }

  .trust-inner {
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
  }

  .trust-item {
    padding: 28px 18px;
    border-right: 1px solid #444;
    border-bottom: 1px solid #444;
  }

  .trust-item:nth-child(2) {
    border-right: 0;
  }

  .trust-item:nth-child(3) {
    border-bottom: 0;
  }

  .trust-item:nth-child(4) {
    border-right: 0;
    border-bottom: 0;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .jobs-grid,
  .company-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .split-dark,
  .split-light {
    padding: 30px;
  }

  .split-dark h2 {
    font-size: 49px;
  }

  .cta {
    margin: 0 18px 70px;
    padding: 60px 25px;
  }

  .footer-top {
    grid-template-columns: 1fr 1fr;
    padding-left: 18px;
    padding-right: 18px;
  }

  .footer-bottom {
    padding-left: 18px;
    padding-right: 18px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .modal-overlay {
    padding: 10px;
  }

  .modal-top {
    padding: 28px 20px;
  }

  .modal-top h2 {
    font-size: 31px;
  }

  .job-highlight-row {
    padding: 18px 20px;
  }

  .modal-content {
    padding: 25px 20px;
    grid-template-columns: 1fr;
  }
}


@media (max-width: 480px) {

  .brand-text {
    font-size: 14px;
  }

  .hero h1 {
    font-size: 51px;
  }

  .hero-visual {
    min-height: 420px;
  }

  .hero-card {
    left: 18px;
    right: 18px;
    bottom: 18px;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 44px;
  }

  .trust-item strong {
    font-size: 24px;
  }

  .profile-nav {
    padding-left: 0;
    border-left: 0;
  }

}
</style>
