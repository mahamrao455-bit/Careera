<template>
  <div>

    <!-- HERO -->

    <section class="hero">

      <div class="hero-copy">

        <div class="hero-kicker">
          THE NEXT MOVE
        </div>

        <h1>
          Find work
          <br>
          that feels
          <span>right.</span>
        </h1>

        <p class="hero-text">
          Discover meaningful opportunities from ambitious companies
          around the world. Search smarter, apply faster and keep
          your career moving forward.
        </p>


        <form
          class="hero-search"
          @submit.prevent="searchJobs"
        >

          <label class="hero-search-field">

            <span>⌕</span>

            <input
              v-model="keyword"
              type="text"
              placeholder="Job title, skill or company"
            >

          </label>


          <label class="hero-search-field">

            <span>⌖</span>

            <input
              v-model="location"
              type="text"
              placeholder="Location or remote"
            >

          </label>


          <button
            type="submit"
            class="btn btn-maroon"
          >
            Search jobs
          </button>

        </form>

      </div>


      <div class="hero-visual">

        <div class="hero-card">

          <div class="hero-card-top">

            <div class="company-logo">
              N
            </div>

            <div>

              <strong>
                Senior Frontend Developer
              </strong>

              <span>
                Northstar Labs · Remote
              </span>

            </div>

          </div>


          <div class="hero-job-meta">

            <span>React</span>
            <span>TypeScript</span>
            <span>Next.js</span>
            <span>Full-time</span>

          </div>


          <div class="hero-card-footer">

            <strong>
              $95K – $125K
            </strong>

            <small>
              Posted 2h ago
            </small>

          </div>

        </div>

      </div>

    </section>


    <!-- TRUST -->

    <section class="trust-strip">

      <div class="trust-inner">

        <div class="trust-item">
          <strong>12K+</strong>
          <span>Open positions</span>
        </div>

        <div class="trust-item">
          <strong>3.4K</strong>
          <span>Hiring companies</span>
        </div>

        <div class="trust-item">
          <strong>48</strong>
          <span>Countries represented</span>
        </div>

        <div class="trust-item">
          <strong>91%</strong>
          <span>Candidate satisfaction</span>
        </div>

      </div>

    </section>


    <!-- CATEGORIES -->

    <section class="section">

      <div class="section-header">

        <div>

          <div class="section-label">
            EXPLORE
          </div>

          <h2 class="section-title">
            Find your field.
          </h2>

        </div>

        <p class="section-description">
          Explore opportunities across the areas shaping
          the modern workplace.
        </p>

      </div>


      <div class="category-grid">

        <router-link
          v-for="(category, index) in categories"
          :key="category.name"
          to="/jobs"
          class="category-card"
          @click.native="selectCategory(category.name)"
        >

          <span class="category-number">
            0{{ index + 1 }}
          </span>

          <h3>
            {{ category.name }}
          </h3>

          <p>
            {{ category.count }} open positions
          </p>

          <span class="category-arrow">
            ↗
          </span>

        </router-link>

      </div>

    </section>


    <!-- FEATURED JOBS -->

    <section class="section jobs-section">

      <div class="section-header">

        <div>

          <div class="section-label">
            HANDPICKED
          </div>

          <h2 class="section-title">
            Featured jobs.
          </h2>

        </div>

        <router-link
          to="/jobs"
          class="btn btn-outline"
        >
          View all jobs
        </router-link>

      </div>


      <div class="jobs-grid">

        <article
          v-for="job in featuredJobs"
          :key="job.id"
          class="job-card"
        >

          <div class="job-card-top">

            <div class="job-card-company">

              <div class="company-logo">
                {{ job.company.charAt(0) }}
              </div>

              <span>
                {{ job.company }}
              </span>

            </div>


            <button
              class="save-button"
              :class="{ saved: isSaved(job.id) }"
              @click="toggleSave(job)"
            >
              {{ isSaved(job.id) ? "♥" : "♡" }}
            </button>

          </div>


          <h3>
            {{ job.title }}
          </h3>

          <div class="job-location">
            {{ job.location }}
          </div>


          <div class="job-tags">

            <span
              v-for="skill in job.skills"
              :key="skill"
            >
              {{ skill }}
            </span>

          </div>


          <div class="job-card-bottom">

            <strong>
              {{ job.salary }}
            </strong>

            <button @click="viewJob(job)">
              View role →
            </button>

          </div>

        </article>

      </div>

    </section>


    <!-- SPLIT -->

    <section class="split-section">

      <div class="split-dark">

        <div class="section-label">
          WHY CAREERA
        </div>

        <h2>
          Your career
          deserves
          better.
        </h2>

        <p>
          Less noise. Better opportunities. Careerra brings
          job discovery, applications and career organization
          together in one thoughtful platform.
        </p>

        <div>
          <router-link
            to="/jobs"
            class="btn btn-maroon"
          >
            Explore opportunities
          </router-link>
        </div>

      </div>


      <div class="split-light">

        <div class="section-label">
          TRENDING NOW
        </div>


        <div
          v-for="job in trendingJobs"
          :key="job.id"
          class="featured-job-row"
          @click="viewJob(job)"
          style="cursor:pointer"
        >

          <div class="company-logo">
            {{ job.company.charAt(0) }}
          </div>

          <div class="featured-job-row-main">

            <strong>
              {{ job.title }}
            </strong>

            <span>
              {{ job.company }} · {{ job.location }}
            </span>

          </div>

          <span>
            {{ job.salary }}
          </span>

        </div>

      </div>

    </section>


    <!-- COMPANIES -->

    <section class="section">

      <div class="section-header">

        <div>

          <div class="section-label">
            TOP EMPLOYERS
          </div>

          <h2 class="section-title">
            Companies to watch.
          </h2>

        </div>

        <router-link
          to="/companies"
          class="btn btn-outline"
        >
          Explore companies
        </router-link>

      </div>


      <div class="company-grid">

        <article
          v-for="company in companies.slice(0, 3)"
          :key="company.id"
          class="company-card"
        >

          <div class="company-card-header">

            <div class="company-logo">
              {{ company.logo }}
            </div>

            <div>

              <h3>
                {{ company.name }}
              </h3>

              <span>
                {{ company.industry }}
              </span>

            </div>

          </div>


          <p>
            {{ company.location }}
          </p>


          <div class="company-card-footer">

            <span>
              {{ company.openRoles }} open roles
            </span>

            <span>
              Explore →
            </span>

          </div>

        </article>

      </div>

    </section>


    <!-- CTA -->

    <section class="cta">

      <div class="section-label" style="color:#efcbd1;">
        READY WHEN YOU ARE
      </div>

      <h2>
        The next opportunity
        <br>
        is closer than you think.
      </h2>

      <p>
        Search thousands of opportunities and find a role
        that matches where you want your career to go.
      </p>

      <router-link
        to="/jobs"
        class="btn"
      >
        Start exploring →
      </router-link>

    </section>

  </div>
</template>


<script>
export default {

  name: "HomeView",

  props: [
    "jobs",
    "companies",
    "savedJobs",
    "toggleSave",
    "viewJob"
  ],

  data() {

    return {

      keyword: "",
      location: "",

      categories: [
        {
          name: "Engineering",
          count: "2,840"
        },
        {
          name: "Design",
          count: "1,120"
        },
        {
          name: "Marketing",
          count: "870"
        },
        {
          name: "Data & AI",
          count: "1,430"
        }
      ]

    };

  },

  computed: {

    featuredJobs() {
      return this.jobs.filter(
        job => job.featured
      );
    },

    trendingJobs() {
      return this.jobs.slice(3, 7);
    }

  },

  methods: {

    isSaved(id) {
      return this.savedJobs.includes(id);
    },

    selectCategory(category) {
      this.$router.push({
        path: "/jobs",
        query: {
          category
        }
      });
    },

    searchJobs() {

      this.$router.push({
        path: "/jobs",
        query: {
          q: this.keyword,
          location: this.location
        }
      });

    }

  }

};
</script>