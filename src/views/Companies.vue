<template>
  <section class="section companies-page">

    <div class="section-header">

      <div>

        <div class="section-label">
          EMPLOYERS
        </div>

        <h1 class="section-title">
          Meet the companies.
        </h1>

      </div>

      <p class="section-description">
        Discover teams building products, services and
        companies shaping what comes next.
      </p>

    </div>


    <div class="company-filters">

      <input
        v-model="search"
        placeholder="Search companies..."
      >

      <select v-model="industry">

        <option value="">
          All industries
        </option>

        <option>
          Technology
        </option>

        <option>
          Design
        </option>

        <option>
          Software
        </option>

        <option>
          Finance
        </option>

        <option>
          Healthcare
        </option>

        <option>
          Enterprise
        </option>

      </select>

    </div>


    <div class="company-large-grid">

      <article
        v-for="company in filteredCompanies"
        :key="company.id"
        class="company-large-card"
      >

        <div class="company-large-top">

          <div class="company-logo">
            {{ company.logo }}
          </div>

          <span>
            {{ company.industry }}
          </span>

        </div>


        <h2>
          {{ company.name }}
        </h2>

        <p>
          {{ company.location }}
        </p>


        <div class="company-large-footer">

          <strong>
            {{ company.openRoles }} open roles
          </strong>

          <router-link
            to="/jobs"
            :query="{ q: company.name }"
          >
            View jobs →
          </router-link>

        </div>

      </article>

    </div>

  </section>
</template>


<script>
export default {

  name: "CompaniesView",

  props: [
    "companies"
  ],

  data() {

    return {

      search: "",
      industry: ""

    };

  },

  computed: {

    filteredCompanies() {

      return this.companies.filter(company => {

        const matchesSearch =
          !this.search ||
          company.name
            .toLowerCase()
            .includes(
              this.search.toLowerCase()
            );

        const matchesIndustry =
          !this.industry ||
          company.industry === this.industry;

        return matchesSearch && matchesIndustry;

      });

    }

  }

};
</script>


<style scoped lang="scss">

.company-filters {

  margin-bottom: 35px;

  display: grid;

  grid-template-columns: 2fr 1fr;

  gap: 8px;

}

.company-filters input,
.company-filters select {

  height: 48px;

  border: 1px solid #dedad3;

  background: white;

  padding: 0 13px;

  outline: 0;

  font-size: 10px;

}

.company-large-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 14px;

}

.company-large-card {

  min-height: 250px;

  padding: 28px;

  background: white;

  border: 1px solid #dedad3;

  transition: 0.25s ease;

}

.company-large-card:hover {

  transform: translateY(-4px);

  border-color: #c7c0b8;

  box-shadow:
    0 20px 45px
    rgba(40,35,30,0.07);

}

.company-large-top {

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

}

.company-large-top > span {

  color: #77736d;

  font-size: 8px;

  text-transform: uppercase;

  letter-spacing: 0.1em;

}

.company-large-card h2 {

  margin: 35px 0 8px;

  font-family: Georgia, serif;

  font-size: 28px;

  font-weight: 500;

}

.company-large-card p {

  margin: 0;

  color: #77736d;

  font-size: 10px;

}

.company-large-footer {

  margin-top: 40px;

  padding-top: 15px;

  border-top: 1px solid #e4e0d9;

  display: flex;

  justify-content: space-between;

  align-items: center;

}

.company-large-footer strong {

  color: #6f1d2a;

  font-size: 9px;

}

.company-large-footer a {

  color: #454545;

  font-size: 9px;

  font-weight: 700;

}


@media (max-width: 850px) {

  .company-large-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


@media (max-width: 580px) {

  .company-filters {

    grid-template-columns: 1fr;

  }

  .company-large-grid {

    grid-template-columns: 1fr;

  }

}

</style>