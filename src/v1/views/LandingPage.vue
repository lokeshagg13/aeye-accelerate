<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <PageHeader />
  <div class="body">
    <!-- Default page layout -->
    <div
      class="landing-page-default"
      v-if="!showLearningApproach && !showSupport"
    >
      <div class="default-body">
        <h2 class="page-title">
          Your neurodivergent child’s best learning companion (after you)
        </h2>
        <div class="app-info-div">
          <div class="text-content">
            <p class="welcome-text">
              <b>Welcome to A.EYE </b> - the innovative assistive technology
              helping young children with autism acquire the most critical
              literacy skills before school.
            </p>
            <p class="benefit-text">
              <b>A.EYE</b> - makes learning more accessible and fun while
              supporting parents on their children’s educational journeys.
            </p>
          </div>
          <div class="app-info-img">
            <img src="@/v1/assets/landing-img-1.svg" alt="Child Image" />
          </div>
        </div>
        <div class="landing-buttons-div">
          <div class="landing-buttons-inner">
            <div class="landing-button-div">
              <div
                class="circle-box"
                id="approach-guide"
                @click="handleApproachGuideClick"
              >
                Learning approaches for your children
              </div>
            </div>
            <div class="landing-button-div">
              <div
                class="circle-box"
                id="support-guide"
                @click="handleSupportGuideClick"
              >
                How we can help support your children's learning
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            class="tutorial-button"
            @click="showModal = true"
          >
            Let's start the tutorial!
          </button>
          <!-- modal luanched -->
          <div v-if="showModal" class="modal-wrapper">
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <!-- Use grid system to place the title and button in different columns of the same row -->
                    <div class="modal-title">
                      <div id="staticBackdropLabel">Learning Approaches</div>
                    </div>
                    <div class="modal-close">
                      <div
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="showModal = false"
                      >
                        X
                      </div>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="row" id="tutorials-space">
                      <div
                        class="col"
                        id="tutorial-card-space"
                        v-for="(item, index) in tutorialList"
                        :key="index"
                      >
                        <div
                          class="tutorial-card"
                          @click="navigateToTutorial(item)"
                        >
                          <div class="card-body">
                            {{ item }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="default-footer">
        <div class="sponsors">
          <div class="sponsors-row">
            <div class="sponsors-col" id="sponsors-text-space">
              <b><i>Proudly sponsored by:</i></b>
            </div>
            <div class="sponsors-col" id="sponsors-image-space">
              <div class="sponsor-image-div">
                <img
                  src="../assets/tad.png"
                  alt="sponsor-1"
                  class="sponsor-image"
                />
              </div>
              <div class="sponsor-image-div">
                <img
                  src="../assets/aspect.png"
                  alt="sponsor-2"
                  class="sponsor-image"
                />
              </div>
              <div class="sponsor-image-div">
                <img
                  src="../assets/eas.png"
                  alt="sponsor-3"
                  class="sponsor-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- learning approach layout -->
    <div class="landing-page-learning-approach" v-if="showLearningApproach">
      <div class="learning-approach-content">
        <div class="learning-approach-header">
          <h2>Learning approaches for neurodivergent children</h2>
          <div class="close-learning-approach" @click="closeLearningApproach">
            X
          </div>
        </div>
        <div class="learning-info-div">
          <div class="text-content">
            <p class="common-text">
              There are 3 main “learning styles” which attempt to explain how
              people may acquire new information: <b>Visual</b> (<i>seeing</i>),
              <b>Auditory</b> (<i>hearing</i>), and
              <b>Kinesthetic</b> (<i>feeling</i>) - also known as the
              <b>VAK model.</b>
            </p>
            <p class="common-text">
              Assessing your child’s learning style and adapting
              <b>specific teaching methods</b> that meet their needs are
              <b>key to their greater success</b> as students in life.
            </p>
          </div>
          <div class="learning-approach-img">
            <img src="@/v1/assets/landing-img-2.svg" alt="Child image" />
          </div>
        </div>
        <img
          class="approaches-list-img"
          src="@/v1/assets/landing-2-list.svg"
          alt="List of approaches"
        />
      </div>
    </div>
    <!-- support page layout -->
    <div class="landing-page-support" v-if="showSupport">
      <div class="support-content">
        <div class="support-header">
          <h2>Our features to support your child’s learning journey</h2>
          <div class="close-support" @click="closeSupport">X</div>
        </div>
        <div class="support-info-div">
          <div class="support-img">
            <img src="@/v1/assets/landing-img-3.svg" alt="Child Image" />
          </div>
          <div class="text-content-support">
            <p class="common-text">
              A.Eye lets neurodiverse children be exposed to the
              <b
                ><i
                  >various learning styles and respective teaching methods</i
                ></b
              >
              to help uncovering their favored learning styles for improved
              performance.
            </p>
            <p class="common-text">
              This <b><i>mixed-method approach</i></b> also helps neurodiverse
              children with <b><i>crossover styles</i></b> to absorb information
              from more than one mode and increase their learning outputs.
            </p>
          </div>
        </div>
        <div class="landing-buttons-div">
          <div class="landing-buttons-inner">
            <div class="landing-button-div">
              <div class="large-circle-box">
                <div class="circle-content">
                  <h4>English</h4>
                  <div class="tutorial-desc">
                    Uploaded image recognition<br />
                    Audio guide for speaking and spelling<br />
                    Handwritten testing
                  </div>
                </div>
              </div>
              <div class="circle-button-container">
                <button class="learn-english" @click="handleEnglishLearning">
                  Learn English
                </button>
                <button class="test-english">Test English</button>
              </div>
            </div>
            <div class="landing-button-div">
              <div class="large-circle-box">
                <div class="circle-content">
                  <h4>Maths</h4>
                  <div class="tutorial-desc">
                    Interactive visuals for counting<br />
                    Audio guide for numbers and arithmetic<br />
                    Handwritten testing
                  </div>
                </div>
              </div>
              <div class="circle-button-container">
                <button class="learn-maths" @click="handleMathsLearning">
                  Learn Maths
                  <p><i>Coming soon</i></p>
                </button>
                <button class="test-maths">Test Maths</button>
              </div>
            </div>
            <div class="landing-button-div">
              <div class="large-circle-box">
                <div class="circle-content">
                  <h4>Typing</h4>
                  <div class="tutorial-desc">
                    Computer and virtual keyboards<br />
                    Audio guide for typing<br />
                    Type testing
                  </div>
                </div>
              </div>
              <div class="circle-button-container">
                <button class="learn-Type" @click="handleTypingLearning">
                  Learn Type
                  <p><i>Coming soon</i></p>
                </button>
                <button class="test-Type">Test Type</button>
              </div>
            </div>
          </div>
        </div>
        <img
          class="support-source-img"
          src="@/v1/assets/support-source.svg"
          alt="support-source"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      backgroundColor: "rgba(223, 233, 213, 1)",
      pageTitle: "A Eye",
      footerClass: "",
      tutorialList: [
        "Learn English",
        "Test English",
        "Learn Maths",
        "Test Maths",
      ],
      showLearningApproach: false,
      showSupport: false,
      showModal: false,
    };
  },
  mounted() {
    // Listen for window resize events to dynamically update footer style
    window.addEventListener("resize", this.updateFooterClass);
    // Initialize footer style when component is loaded
    this.updateFooterClass();
  },
  beforeUnmount() {
    // Remove event listener when component is destroyed
    window.removeEventListener("resize", this.updateFooterClass);
  },
  methods: {
    handleApproachGuideClick() {
      console.log("handle ApproachGuide");
      this.backgroundColor = "rgba(211, 225, 226, 1)";
      this.showLearningApproach = true;
      this.showSupport = false;
    },
    closeLearningApproach() {
      this.backgroundColor = "rgba(223, 233, 213, 1)";
      this.showLearningApproach = false;
      this.showSupport = false;
    },
    handleSupportGuideClick() {
      this.backgroundColor = "rgba(233, 214, 186, 1)";
      console.log("handle SupportGuide");
      this.showLearningApproach = false;
      this.showSupport = true;
    },
    closeSupport() {
      this.backgroundColor = "rgba(223, 233, 213, 1)";
      this.showLearningApproach = false;
      this.showSupport = false;
    },
    navigateToTutorial(selectedTutorial) {
      if (selectedTutorial === "Learn English") {
        console.log(this.$router); // Print $router object
        console.log(selectedTutorial);
        // If English is clicked, navigate to LearningLanguage page
        this.$router.push({ name: "LearningLanguageV1" });
      } else {
        console.log("to be continue");
      }
    },
    updateFooterClass() {
      // Add CSS class based on screen width
      if (window.innerWidth < 768) {
        this.footerClass = "small-screen-footer";
      } else {
        this.footerClass = "large-screen-footer";
      }
    },
    handleEnglishLearning() {
      this.$router.push({ name: "LearningLanguageV1" });
    },
    handleMathsLearning() {
      console.log("to be continue");
    },
    handleTypingLearning() {
      console.log("to be continue");
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #dfe9d5;
  min-height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.landing-page-default {
  padding-top: 20px;
}

.landing-page-learning-approach {
  background-color: #d3e1e2;
  padding-top: 20px;
}

.landing-page-support {
  background-color: #e9d6ba;
  padding-top: 20px;
}

.page-title {
  font-weight: bold;
}

.app-info-div,
.learning-info-div,
.support-info-div {
  display: flex;
  padding: 5% 14% 2% 14%;
}

.text-content,
.text-content-support {
  text-align: left;
  font-size: 1.2rem;
}

.text-content {
  margin-right: 18%;
}

.text-content-support {
  margin-left: 18%;
}

.welcome-text {
  line-height: 150%;
}

.benefit-text {
  line-height: 150%;
  margin-top: 10%;
}

.common-text {
  line-height: 150%;
}

.app-info-img img {
  height: 100%;
  width: auto;
}

.landing-buttons-div {
  display: flex;
  padding: 2% 14% 2% 14%;
}

.landing-buttons-inner {
  display: flex;
  width: 100%;
  justify-content: center;
}

.landing-button-div {
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.circle-box {
  border-radius: 50%;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  margin: 10px;
  border: 2px solid gray;
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: font-size 0.3s;
}

#approach-guide {
  background-color: #d3e1e2;
}

#approach-guide:hover {
  background-color: #b1c8ca;
  font-size: 1.1rem;
}

#support-guide {
  background-color: #e9d6ba;
}

#support-guide:hover {
  background-color: #d3bea1;
  font-size: 1.1rem;
}

.large-circle-box {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #d3e1e2;
  border: 2px solid gray;
  text-align: center;
  padding: 20px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: font-size 0.3s;
}

.circle-button-container {
  display: flex;
  justify-content: space-around;
}

.circle-button-container button {
  cursor: pointer;
  padding: 5px 10px;
  white-space: nowrap;
  width: auto;
  height: 3rem;
  border-radius: 10px;
  border: 1px solid;
  background-color: #d3e1e2;
  font-weight: bold;
  transition: font-size 0.3s;
  margin-right: 5%;
}
.learn-type,
.learn-english,
.learn-maths {
  cursor: pointer;
}

.tutorial-button {
  cursor: pointer;
  width: 20%;
  height: 3rem;
  border-radius: 10px;
  border: 1px solid;
  background-color: #c5e4a0;
  font-weight: bold;
  transition: font-size 0.3s;
}

.tutorial-button:hover {
  background-color: #a5e4a1;
  font-size: 1.1rem;
}

.learning-approach-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.learning-approach-header h2 {
  margin: 10px auto;
  text-align: center;
}

.learning-approach-img img {
  height: 100%;
}

.close-learning-approach {
  cursor: pointer;
  margin-right: 20px;
}

.learning-info-text {
  width: fit-content;
  height: 60%;
  text-align: center;
}

.approaches-list-img {
  width: auto;
  max-width: 500px;
  max-height: 350px;
  margin-top: 10px;
}

.support-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.support-header h2 {
  margin: 10px auto;
  text-align: center;
}

.support-img img {
  height: 100%;
}

.close-support {
  cursor: pointer;
  margin-right: 20px;
}

.support-info-text {
  width: fit-content;
  height: 60%;
  text-align: center;
}

.circle-content {
  font-size: smaller;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.support-source-img {
  margin-top: 10px;
}

.default-footer {
  padding: 7% 4% 1% 6%;
}

.sponsors-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.sponsors-col {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8%;
}

.sponsor-image-div {
  margin: auto 5%;
}

.sponsor-image {
  max-height: 70px;
}

h4 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.tutorial-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: 10px;
}

#sponsor-text {
  display: flex;
  /* Set .row element as Flex container */
  justify-content: space-between;
  /* Distribute items evenly on the main axis */
}

@media screen and (max-width: 768px) {
  .sponsor-image {
    max-width: calc(33% - 30px);
    /* Set max width of image to 1/3 of screen width minus 20 pixels */
    margin: 0 10px;
  }
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Transparent color */
  z-index: 9999;
  /* Ensure modal wrapper is above other elements */
}

/* Modify modal content style */
.modal-dialog {
  border: 2px solid gray;
  position: absolute;
  width: 20rem;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(211, 225, 226, 1);
  /* Background color */
  border-radius: 10px;
  padding: 20px;
}

/* Modify modal title and close button style */
.modal-header {
  padding: 5px;
  display: flex;
  justify-content: space-between;
}

/* Modal title style */
.modal-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 20px;
}

/* Close button style */
.modal-close {
  display: flex;
  justify-content: center;

  color: #000;
  cursor: pointer;
}

/* Display three cards per row */
.modal-body .row {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
  /* Remove spacing between columns */
}

.modal-body .col {
  flex: 0 0 calc(50% - 20px);
  /* Set width of each column to 50%, minus spacing between columns */
  margin: 10px;
  /* Spacing between columns */
}

/* Card style */
.tutorial-card {
  background-color: rgba(223, 233, 213, 1);
  height: max-content;
  min-height: 2rem;
  border: 2px solid gray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.tutorial-card .card-body {
  color: black;
  text-align: center;
}
</style>
