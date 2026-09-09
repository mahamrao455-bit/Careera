<template>
  <section class="section jobs-page">

    <div class="section-header">

      <div>

        <div class="section-label">
          OPPORTUNITIES
        </div>

        <h1 class="section-title">
          Find your next role.
        </h1>

      </div>

      <p class="section-description">
        {{ filteredJobs.length }} opportunities matching your search.
      </p>

    </div>


    <!-- SEARCH / FILTER -->

    <div class="jobs-filter-bar">

      <input
        v-model="search"
        type="text"
        placeholder="Search title, company or skill..."
      >

      <select v-model="category">
        <option value="">All categories</option>
        <option>Engineering</option>
        <option>Design</option>
        <option>Product</option>
        <option>Marketing</option>
        <option>Data</option>
        <option>AI & Data</option>
      </select>

      <select v-model="type">
        <option value="">All types</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
      </select>

      <select v-model="remote">
        <option value="">Any workplace</option>
        <option>Remote</option>
        <option>Hybrid</option>
        <option>On-site</option>
      </select>

    </div>


    <div class="jobs-layout">

      <!-- SIDEBAR -->

      <aside class="jobs-sidebar">

        <div class="filter-group">

          <h4>
            EXPERIENCE
          </h4>

          <label>
            <input
              type="checkbox"
              value="Entry-level"
              v-model="experience"
            >
            Entry-level
          </label>

          <label>
            <input
              type="checkbox"
              value="Mid-level"
              v-model="experience"
            >
            Mid-level
          </label>

          <label>
            <input
              type="checkbox"
              value="Senior"
              v-model="experience"
            >
            Senior
          </label>

        </div>


        <div class="filter-group">

          <h4>
            LOCATION
          </h4>

          <input
            class="side-input"
            v-model="location"
            placeholder="e.g. Dubai, Remote"
          >

        </div>


        <button
          class="clear-filters"
          @click="clearFilters"
        >
          Clear all filters
        </button>

      </aside>


      <!-- RESULTS -->

      <div class="jobs-results">

        <div class="results-top">

          <span>
            {{ filteredJobs.length }} results
          </span>

          <select v-model="sort">
            <option value="newest">
              Sort: Newest
            </option>

            <option value="salary">
              Sort: Highest salary
            </option>
          </select>

        </div>


        <div class="jobs-list">

          <article
            v-for="job in filteredJobs"
            :key="job.id"
            class="job-list-card"
          >

            <div class="job-list-logo">
              {{ job.company.charAt(0) }}
            </div>


            <div class="job-list-content">

              <div class="job-list-heading">

                <div>

                  <span class="job-list-company">
                    {{ job.company }}
                  </span>

                  <h3>
                    {{ job.title }}
                  </h3>

                </div>


                <button
                  class="save-button"
                  :class="{ saved: isSaved(job.id) }"
                  @click="toggleSave(job)"
                >
                  {{ isSaved(job.id) ? "♥" : "♡" }}
                </button>

              </div>


              <div class="job-list-info">

                <span>
                  ⌖ {{ job.location }}
                </span>

                <span>
                  $ {{ job.salary }}
                </span>

                <span>
                  ◉ {{ job.type }}
                </span>

                <span>
                  ↗ {{ job.remote }}
                </span>

              </div>


              <div class="job-tags">

                <span
                  v-for="skill in job.skills"
                  :key="skill"
                >
                  {{ skill }}
                </span>

              </div>


              <div class="job-list-bottom">

                <small>
                  Posted {{ job.posted }}
                </small>

                <button
                  class="view-role"
                  @click="viewJob(job)"
                >
                  View role →
                </button>

              </div>

            </div>

          </article>


          <div
            v-if="filteredJobs.length === 0"
            class="no-results"
          >
            <h3>No roles found.</h3>

            <p>
              Try changing your filters or search terms.
            </p>

            <button
              class="btn btn-maroon"
              @click="clearFilters"
            >
              Reset search
            </button>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>


<script>
export default {

  name: "JobsView",

  props: [
    "jobs",
    "savedJobs",
    "toggleSave",
    "viewJob"
  ],

  data() {

    return {

      search: "",
      category: "",
      type: "",
      remote: "",
      location: "",

      experience: [],

      sort: "newest"

    };

  },

  created() {

    this.search =
      this.$route.query.q || "";

    this.location =
      this.$route.query.location || "";

    this.category =
      this.$route.query.category || "";

  },

  computed: {

    filteredJobs() {

      let result = [...this.jobs];

      const term =
        this.search
          .trim()
          .toLowerCase();

      if (term) {

        result = result.filter(job =>

          job.title
            .toLowerCase()
            .includes(term)

          ||

          job.company
            .toLowerCase()
            .includes(term)

          ||

          job.skills.some(skill =>
            skill.toLowerCase().includes(term)
          )

        );

      }


      if (this.category) {

        result = result.filter(job =>
          job.category === this.category
        );

      }


      if (this.type) {

        result = result.filter(job =>
          job.type === this.type
        );

      }


      if (this.remote) {

        result = result.filter(job =>
          job.remote === this.remote
        );

      }


      if (this.location) {

        const loc =
          this.location.toLowerCase();

        result = result.filter(job =>
          job.location
            .toLowerCase()
            .includes(loc)
        );

      }


      if (this.experience.length) {

        result = result.filter(job =>
          this.experience.includes(
            job.experience
          )
        );

      }


      if (this.sort === "salary") {

        result.sort((a, b) => {
          const first =
            parseInt(a.salary.replace(/\D/g, ""));

          const second =
            parseInt(b.salary.replace(/\D/g, ""));

          return second - first;
        });

      }

      return result;

    }

  },

  methods: {

    isSaved(id) {
      return this.savedJobs.includes(id);
    },

    clearFilters() {

      this.search = "";
      this.category = "";
      this.type = "";
      this.remote = "";
      this.location = "";
      this.experience = [];

    }

  }

};
</script>


<style scoped lang="scss">

.jobs-filter-bar {

  margin-bottom: 35px;
  padding: 12px;

  background: white;

  border: 1px solid #dedad3;

  display: grid;

  grid-template-columns:
    2fr
    1fr
    1fr
    1fr;

  gap: 8px;

}

.jobs-filter-bar input,
.jobs-filter-bar select {

  height: 48px;

  border: 1px solid #dedad3;

  background: #f6f4f1;

  padding: 0 13px;

  outline: 0;

  color: #252525;

  font-size: 10px;

}

.jobs-layout {

  display: grid;

  grid-template-columns: 220px 1fr;

  gap: 30px;

}

.jobs-sidebar {

  background: #ece9e4;

  border: 1px solid #dedad3;

  padding: 22px;

  align-self: start;

}

.filter-group {

  padding-bottom: 25px;

  margin-bottom: 25px;

  border-bottom: 1px solid #d7d2ca;

}

.filter-group h4 {

  margin: 0 0 15px;

  color: #77736d;

  font-size: 8px;

  letter-spacing: 0.15em;

}

.filter-group label {

  display: flex;

  align-items: center;

  gap: 7px;

  margin-bottom: 11px;

  color: #454545;

  font-size: 10px;

}

.side-input {

  width: 100%;

  height: 40px;

  padding: 0 10px;

  border: 1px solid #d4cfc7;

  background: white;

  outline: 0;

  font-size: 9px;

}

.clear-filters {

  border: 0;

  background: transparent;

  color: #6f1d2a;

  padding: 0;

  font-size: 9px;

  cursor: pointer;

}

.results-top {

  padding-bottom: 15px;

  display: flex;

  justify-content: space-between;

  color: #77736d;

  font-size: 9px;

}

.results-top select {

  border: 0;

  background: transparent;

  font-size: 9px;

  outline: 0;

}

.job-list-card {

  display: grid;

  grid-template-columns: 58px 1fr;

  gap: 17px;

  padding: 24px;

  margin-bottom: 10px;

  background: white;

  border: 1px solid #dedad3;

}

.job-list-card:hover {

  border-color: #c6c0b7;

}

.job-list-logo {

  width: 58px;

  height: 58px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #272727;

  color: white;

  font-weight: 800;

}

.job-list-heading {

  display: flex;

  justify-content: space-between;

  gap: 15px;

}

.job-list-company {

  color: #77736d;

  font-size: 9px;

}

.job-list-heading h3 {

  margin: 6px 0 8px;

  font-size: 17px;

  font-weight: 600;

}

.job-list-info {

  display: flex;

  flex-wrap: wrap;

  gap: 13px;

  color: #77736d;

  font-size: 9px;

}

.job-list-bottom {

  margin-top: 16px;

  padding-top: 13px;

  border-top: 1px solid #e3dfd8;

  display: flex;

  justify-content: space-between;

  align-items: center;

}

.job-list-bottom small {

  color: #99948e;

  font-size: 8px;

}

.view-role {

  border: 0;

  background: transparent;

  color: #6f1d2a;

  padding: 0;

  font-size: 9px;

  font-weight: 700;

  text-transform: uppercase;

  cursor: pointer;

}

.no-results {

  padding: 70px 20px;

  background: white;

  border: 1px solid #dedad3;

  text-align: center;

}

.no-results h3 {

  font-family: Georgia, serif;

  font-size: 30px;

  font-weight: 500;

  margin: 0;

}

.no-results p {

  margin: 10px 0 20px;

  color: #77736d;

  font-size: 11px;

}


@media (max-width: 800px) {

  .jobs-filter-bar {

    grid-template-columns: 1fr;

  }

  .jobs-layout {

    grid-template-columns: 1fr;

  }

  .jobs-sidebar {

    order: 2;

  }

}


@media (max-width: 600px) {

  .job-list-card {

    grid-template-columns: 1fr;

  }

}

</style>