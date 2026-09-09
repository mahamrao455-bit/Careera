<template>
  <section class="section">

    <div class="section-header">

      <div>

        <div class="section-label">
          YOUR LIST
        </div>

        <h1 class="section-title">
          Saved jobs.
        </h1>

      </div>

      <p class="section-description">
        Keep interesting opportunities close until you're ready to apply.
      </p>

    </div>


    <div
      v-if="saved.length"
      class="saved-grid"
    >

      <article
        v-for="job in saved"
        :key="job.id"
        class="saved-card"
      >

        <div class="saved-top">

          <div class="company-logo">
            {{ job.company.charAt(0) }}
          </div>

          <button
            class="save-button saved"
            @click="toggleSave(job)"
          >
            ♥
          </button>

        </div>


        <span class="saved-company">
          {{ job.company }}
        </span>

        <h2>
          {{ job.title }}
        </h2>

        <p>
          {{ job.location }}
        </p>

        <div class="job-tags">

          <span
            v-for="skill in job.skills"
            :key="skill"
          >
            {{ skill }}
          </span>

        </div>


        <div class="saved-bottom">

          <strong>
            {{ job.salary }}
          </strong>

          <button
            class="view-role"
            @click="viewJob(job)"
          >
            View role →
          </button>

        </div>

      </article>

    </div>


    <div
      v-else
      class="empty-saved"
    >

      <h2>
        Nothing saved yet.
      </h2>

      <p>
        Browse jobs and save the roles you want to revisit.
      </p>

      <router-link
        to="/jobs"
        class="btn btn-maroon"
      >
        Find jobs
      </router-link>

    </div>

  </section>
</template>


<script>
export default {

  name: "SavedView",

  props: [
    "jobs",
    "savedJobs",
    "toggleSave",
    "viewJob"
  ],

  computed: {

    saved() {

      return this.jobs.filter(job =>
        this.savedJobs.includes(job.id)
      );

    }

  }

};
</script>


<style scoped lang="scss">

.saved-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 14px;

}

.saved-card {

  padding: 25px;

  background: white;

  border: 1px solid #dedad3;

}

.saved-top {

  display: flex;

  justify-content: space-between;

}

.saved-company {

  display: block;

  margin-top: 22px;

  color: #77736d;

  font-size: 9px;

}

.saved-card h2 {

  margin: 8px 0;

  font-family: Georgia, serif;

  font-size: 25px;

  font-weight: 500;

}

.saved-card p {

  color: #77736d;

  font-size: 9px;

}

.saved-bottom {

  margin-top: 25px;

  padding-top: 15px;

  border-top: 1px solid #e5e1da;

  display: flex;

  justify-content: space-between;

  align-items: center;

}

.saved-bottom strong {

  color: #6f1d2a;

  font-size: 11px;

}

.empty-saved {

  padding: 100px 25px;

  text-align: center;

  background: white;

  border: 1px solid #dedad3;

}

.empty-saved h2 {

  margin: 0;

  font-family: Georgia, serif;

  font-size: 38px;

  font-weight: 500;

}

.empty-saved p {

  color: #77736d;

  font-size: 11px;

  margin: 12px 0 25px;

}


@media (max-width: 850px) {

  .saved-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


@media (max-width: 600px) {

  .saved-grid {

    grid-template-columns: 1fr;

  }

}

</style>