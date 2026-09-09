<template>
  <section class="dashboard-page">

    <div class="dashboard-hero">

      <div>

        <div class="section-label">
          CANDIDATE DASHBOARD
        </div>

        <h1>
          Good morning,
          <span>Maham.</span>
        </h1>

        <p>
          Keep your applications moving and stay ready for
          your next opportunity.
        </p>

      </div>


      <router-link
        to="/jobs"
        class="btn btn-maroon"
      >
        Find new roles
      </router-link>

    </div>


    <div class="dashboard-grid">

      <!-- PROFILE -->

      <aside class="dashboard-sidebar">

        <div class="profile-panel">

          <div class="big-avatar">
            M
          </div>

          <h2>
            Maham Rao
          </h2>

          <p>
            Full Stack Developer
          </p>

          <span>
            Karachi · Open to remote
          </span>

          <button>
            Edit profile
          </button>

        </div>


        <div class="dashboard-menu">

          <button class="active">
            Overview
          </button>

          <button>
            My applications
          </button>

          <button>
            Saved jobs
          </button>

          <button>
            Resume
          </button>

          <button>
            Preferences
          </button>

        </div>

      </aside>


      <!-- MAIN -->

      <div class="dashboard-main">

        <div class="stats-grid">

          <div class="stat-card">

            <span>
              Applications
            </span>

            <strong>
              {{ applications.length }}
            </strong>

            <small>
              Active applications
            </small>

          </div>


          <div class="stat-card">

            <span>
              Interviews
            </span>

            <strong>
              1
            </strong>

            <small>
              This month
            </small>

          </div>


          <div class="stat-card">

            <span>
              Saved jobs
            </span>

            <strong>
              {{ savedJobs.length }}
            </strong>

            <small>
              Roles to revisit
            </small>

          </div>


          <div class="stat-card">

            <span>
              Profile strength
            </span>

            <strong>
              82%
            </strong>

            <small>
              Looking good
            </small>

          </div>

        </div>


        <!-- APPLICATIONS -->

        <section class="dashboard-card">

          <div class="dashboard-card-header">

            <div>

              <div class="section-label">
                APPLICATION TRACKER
              </div>

              <h2>
                Your applications.
              </h2>

            </div>

            <router-link
              to="/jobs"
            >
              Find more →
            </router-link>

          </div>


          <div class="application-list">

            <article
              v-for="application in applications"
              :key="application.id"
              class="application-item"
            >

              <div class="application-logo">
                {{ application.company.charAt(0) }}
              </div>


              <div class="application-main">

                <strong>
                  {{ application.job }}
                </strong>

                <span>
                  {{ application.company }}
                </span>

                <small>
                  Applied {{ application.date }}
                </small>

              </div>


              <div class="application-status">

                <span>
                  {{ application.stage }}
                </span>

                <div class="progress-bar">

                  <div
                    :style="{ width: application.progress + '%' }"
                  ></div>

                </div>

              </div>

            </article>

          </div>

        </section>


        <!-- CAREER TIP -->

        <section class="career-tip">

          <div class="section-label">
            CAREER NOTE
          </div>

          <h2>
            Small improvements
            create better opportunities.
          </h2>

          <p>
            Complete your profile, keep your resume current
            and save roles that align with your goals.
          </p>

        </section>

      </div>

    </div>

  </section>
</template>


<script>
export default {

  name: "DashboardView",

  props: [
    "savedJobs",
    "applications"
  ]

};
</script>


<style scoped lang="scss">

.dashboard-page {

  max-width: 1360px;

  margin: 0 auto;

  padding: 60px 35px 100px;

}

.dashboard-hero {

  padding: 45px;

  background: #272727;

  color: white;

  display: flex;

  justify-content: space-between;

  align-items: flex-end;

  gap: 30px;

}

.dashboard-hero .section-label {

  color: #c899a0;

}

.dashboard-hero h1 {

  margin: 0;

  font-family: Georgia, serif;

  font-size: 55px;

  font-weight: 500;

  line-height: 0.95;

}

.dashboard-hero h1 span {

  color: #dbaeb5;

}

.dashboard-hero p {

  max-width: 430px;

  color: #a7a7a7;

  line-height: 1.7;

  font-size: 11px;

}

.dashboard-grid {

  margin-top: 25px;

  display: grid;

  grid-template-columns: 235px 1fr;

  gap: 20px;

}

.dashboard-sidebar {

  align-self: start;

}

.profile-panel {

  padding: 25px;

  background: white;

  border: 1px solid #dedad3;

  text-align: center;

}

.big-avatar {

  width: 70px;

  height: 70px;

  margin: 0 auto 15px;

  border-radius: 50%;

  background: #6f1d2a;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 20px;

  font-weight: 700;

}

.profile-panel h2 {

  margin: 0;

  font-size: 16px;

}

.profile-panel p {

  margin: 6px 0;

  color: #6f1d2a;

  font-size: 10px;

}

.profile-panel span {

  color: #77736d;

  font-size: 9px;

}

.profile-panel button {

  width: 100%;

  height: 38px;

  margin-top: 18px;

  border: 1px solid #dedad3;

  background: #f6f4f1;

  color: #454545;

  font-size: 9px;

  text-transform: uppercase;

  letter-spacing: .08em;

}

.dashboard-menu {

  margin-top: 10px;

  padding: 9px;

  background: white;

  border: 1px solid #dedad3;

}

.dashboard-menu button {

  width: 100%;

  height: 39px;

  padding: 0 10px;

  text-align: left;

  border: 0;

  background: transparent;

  color: #77736d;

  font-size: 9px;

}

.dashboard-menu button.active,
.dashboard-menu button:hover {

  background: #f1eee9;

  color: #6f1d2a;

}

.stats-grid {

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 10px;

}

.stat-card {

  padding: 20px;

  background: white;

  border: 1px solid #dedad3;

}

.stat-card span {

  display: block;

  color: #77736d;

  font-size: 8px;

  text-transform: uppercase;

  letter-spacing: .12em;

}

.stat-card strong {

  display: block;

  margin: 13px 0 4px;

  font-family: Georgia, serif;

  font-size: 34px;

  font-weight: 500;

}

.stat-card small {

  color: #99948e;

  font-size: 8px;

}

.dashboard-card {

  margin-top: 10px;

  padding: 30px;

  background: white;

  border: 1px solid #dedad3;

}

.dashboard-card-header {

  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  margin-bottom: 25px;

}

.dashboard-card-header h2 {

  margin: 0;

  font-family: Georgia, serif;

  font-size: 36px;

  font-weight: 500;

}

.dashboard-card-header > a {

  color: #6f1d2a;

  font-size: 9px;

  font-weight: 700;

}

.application-item {

  min-height: 84px;

  padding: 16px 0;

  display: grid;

  grid-template-columns: 45px 1fr 170px;

  gap: 13px;

  align-items: center;

  border-bottom: 1px solid #e5e1da;

}

.application-item:last-child {

  border-bottom: 0;

}

.application-logo {

  width: 45px;

  height: 45px;

  background: #272727;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 700;

}

.application-main strong {

  display: block;

  font-size: 11px;

}

.application-main span {

  display: block;

  margin-top: 4px;

  color: #6f1d2a;

  font-size: 9px;

}

.application-main small {

  display: block;

  margin-top: 4px;

  color: #99948e;

  font-size: 8px;

}

.application-status span {

  display: block;

  margin-bottom: 8px;

  color: #6f1d2a;

  font-size: 9px;

  font-weight: 700;

}

.progress-bar {

  height: 4px;

  background: #e7e3dd;

}

.progress-bar div {

  height: 100%;

  background: #6f1d2a;

}

.career-tip {

  margin-top: 10px;

  padding: 38px;

  background: #e8e2dc;

}

.career-tip h2 {

  max-width: 650px;

  margin: 0;

  font-family: Georgia, serif;

  font-size: 42px;

  line-height: 1;

  font-weight: 500;

}

.career-tip p {

  max-width: 500px;

  color: #77736d;

  font-size: 11px;

  line-height: 1.7;

}


@media (max-width: 900px) {

  .dashboard-grid {

    grid-template-columns: 1fr;

  }

  .dashboard-sidebar {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 10px;

  }

  .dashboard-menu {

    margin-top: 0;

  }

  .stats-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


@media (max-width: 600px) {

  .dashboard-page {

    padding-left: 18px;

    padding-right: 18px;

  }

  .dashboard-hero {

    padding: 30px 22px;

    flex-direction: column;

    align-items: flex-start;

  }

  .dashboard-hero h1 {

    font-size: 42px;

  }

  .dashboard-sidebar {

    display: block;

  }

  .dashboard-menu {

    margin-top: 10px;

  }

  .stats-grid {

    grid-template-columns: 1fr 1fr;

  }

  .dashboard-card {

    padding: 20px;

  }

  .application-item {

    grid-template-columns: 42px 1fr;

  }

  .application-status {

    grid-column: 2;

  }

}

</style>