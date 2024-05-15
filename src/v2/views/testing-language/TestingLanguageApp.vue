<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- <index-navbar /> -->
    <parent-navbar />
    <br />
    <br />
    <section
      class="header relative items-center flex mb-24"
      :class="[testModeOn ? 'h-screen max-h-900-px' : 'max-h-300-px']"
    >
      <div class="container mx-auto items-center justify-center flex flex-wrap">
        <div class="w-full md:w-10/12 lg:w-10/12 xl:w-10/12 px-4">
          <div
            v-if="!testModeOn"
            class="pt-32 sm:pt-0 w-full flex flex-col items-center"
          >
            <div class="flex justify-center items-center">
              <img
                alt="..."
                src="@/v2/assets/images/loading-mascot.gif"
                class="align-middle"
                width="200vw"
                height="300vh"
              />
            </div>
            <h2 class="font-semibold text-4xl text-blueGray-600">
              Preparing a word linking test for you ...
            </h2>
          </div>
          <div v-if="testModeOn" class="pt-32 sm:pt-0">
            <h2 class="mt-12 font-semibold text-4xl text-blueGray-600">
              Let's Test English with Fun Images!
            </h2>
            <div class="pt-6">
              <div class="flex flex-wrap justify-between mr-auto ml-auto">
                <div
                  class="w-full w-12/12 sm:w-12/12 md:w-6/12 lg:w-6/12 mt-4 md:px-4"
                >
                  <div
                    id="test-image-div"
                    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-emerald-500"
                  >
                    <img
                      alt="..."
                      :src="currentTestData.imageURL"
                      class="w-full align-middle rounded-t-lg"
                      :class="[isObjectClickable ? 'cursor-pointer' : '']"
                      @mousemove="handleImageHover"
                      @click="handleImageClick"
                    />
                  </div>
                  <div
                    class="relative flex flex-wrap w-full justify-end mb-12 md:hidden sm:hidden xs:hidden"
                  >
                    <button
                      class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-6 lg:px-12 xl:px-12 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      @click="handleNextImageClick"
                    >
                      <div class="flex flex-wrap justify-between items-center">
                        <span class="mr-3">Next <br />Image</span>
                        <img src="@/v2/assets/icons/next-icon.svg" width="20" />
                      </div>
                    </button>
                  </div>
                </div>
                <div class="w-full md:w-4/12 px-4 pt-12">
                  <div
                    class="md:w-2/12 px-4 border border-solid border-blueGray-300"
                  >
                    <h5 class="font-semibold text-2xl text-blueGray-600">
                      <span v-if="!loadingNextQuestion & !testCompleted">{{
                        this.currentQuestionData.objectClickInstructText
                      }}</span>
                      <span v-if="loadingNextQuestion & !testCompleted"
                        >Loading Next Question</span
                      >
                      <span v-if="testCompleted">This Test is Completed</span>
                    </h5>
                  </div>
                  <div class="mt-12 md:w-2/12">
                    <div class="flex flex-wrap justify-between">
                      <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-6 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        :class="{ 'btn-disabled': testCompleted }"
                        type="button"
                        :disabled="testCompleted"
                        @click="handleAudioButtonClick('oci')"
                      >
                        <div class="flex flex-wrap justify-between">
                          <img src="@/v2/assets/icons/audio-icon.svg" width="30" />
                          <span class="ml-3"
                            >Question <br />
                            Guide</span
                          >
                          <audio
                            id="question-guide-audio"
                            ref="questionGuideAudio"
                            :src="currentQuestionData.objectClickInstructAudio"
                            controls
                            style="display: none"
                          ></audio>
                        </div>
                      </button>
                      <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-6 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        :class="{ 'btn-disabled': isLastQuestion() }"
                        type="button"
                        :disabled="
                          currentQuestionIdx >=
                          currentTestData.questions.length - 1
                        "
                        @click="handleSkipQuestionClick"
                      >
                        <div class="flex flex-wrap justify-between">
                          <img src="@/v2/assets/icons/skip-icon.svg" width="30" />
                          <span class="ml-3">Skip <br />Question</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div
                    class="mt-12 min-h-20-px md:w-2/12 px-4 py-4 border border-solid border-blueGray-300"
                  >
                    <h5 class="font-semibold text-xl text-blueGray-600">
                      <div
                        v-html="clickResponseText"
                        class="response-text-div"
                      ></div>
                    </h5>
                    <audio
                      id="correct-answer-audio"
                      ref="correctAnswerAudio"
                      :src="currentQuestionData.objectClickCorrectAudio"
                      controls
                      style="display: none"
                    ></audio>
                    <audio
                      v-for="(audioData, index) in currentTestIncorrectAudios"
                      :key="index"
                      :class="`incorrectAudioFor${
                        audioData.objectName[0].toUpperCase() +
                        audioData.objectName.slice(1)
                      }`"
                      :src="audioData.objectClickIncorrectAudio"
                      controls
                      style="display: none"
                    ></audio>
                  </div>
                </div>
              </div>
              <div
                class="relative flex flex-wrap w-full justify-end mb-24 md:flex lg:flex xl:flex hidden px-4"
              >
                <button
                  class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-6 lg:px-12 xl:px-12 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  @click="handleNextImageClick"
                >
                  <div class="flex flex-wrap justify-between items-center">
                    <span class="mr-3">Next <br />Image</span>
                    <img src="@/v2/assets/icons/next-icon.svg" width="20" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ParentNavbar from "@/v2/components/ParentNavbar.vue";

export default {
  data() {
    return {
      currentTestIdx: 0,
      currentQuestionIdx: 0,
      currentTestData: {
        imageURL: null,
        questions: [],
      },
      currentQuestionData: null,
      currentTestIncorrectAudios: [],
      isObjectClickable: false,
      loadingNextQuestion: false,
      testCompleted: false,
      testModeOn: false,
      incorrectAnswerAudioData: null,
      clickResponseText: this.getHtmlForResponseText("default"),
    };
  },

  mounted() {
    this.testModeOn = false;
    this.$nextTick(async () => {
      await this.fetchImageTestingData(this.currentTestIdx);
      await this.playQuestionGuideAudio();
    });
  },

  methods: {
    getHtmlForResponseText(type, incorrectName) {
      switch (type) {
        case "correct":
          return `<b><span class="text-3xl">Great Job! Let's<br>keep going.</span></b>`;
        case "incorrect":
          return `<b><span class="text-3xl">Not Quite! That<br>is a <span class="text-red-500"><i>${incorrectName}</i></span>. Let's<br>try again.</span></b>`;
        case "last":
          return `<b><span class="text-3xl">Well Done! Let's<br>move to the <span class="text-emerald-500"><i>next image</i></span>.</span></b>`;
        default:
          return `<b><span class="text-3xl">Click on the<br> 
          <span class="text-lightBlue-400">correct object</span><br>
          as prompted.</span></b>`;
      }
    },

    reinstantiateTestData() {
      this.currentTestData = {
        imageURL: null,
        questions: [],
      };
      this.currentQuestionIdx = 0;
      this.currentQuestionData = null;
      this.currentTestIncorrectAudios = [];
      this.testModeOn = false;
      this.testCompleted = false;
      this.reinstantiateResponseText();
    },

    reinstantiateResponseText() {
      this.clickResponseText = this.getHtmlForResponseText("default");
    },

    constructSentenceForObject(objectName) {
      if (["a", "e", "i", "o", "u"].includes(objectName[0].toLowerCase())) {
        return `That's an ${objectName.toUpperCase()}`;
      } else {
        return `That's a ${objectName.toUpperCase()}`;
      }
    },

    async fetchImageTestingData(testImageIdx) {
      try {
        const response = await fetch(
          `https://34f7-20-191-199-83.ngrok-free.app/api/load-image-testing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
            body: JSON.stringify({ test_image_index: testImageIdx }),
          }
        );
        if (!response.ok) {
          const error = await response.json();
          if (error) {
            throw new Error(error.message);
          } else {
            throw new Error("Error in fetching image segmentation data");
          }
        }
        const data = await response.json();
        if (
          !data.image_data ||
          !data.image_data.test_image_object_data ||
          data.image_data.test_image_object_data.length === 0
        ) {
          throw new Error("Error fetching Test Images from the database");
        }
        this.currentTestData.imageURL = data.image_data.test_image_url;
        const objectsData = data.image_data.test_image_object_data;
        let currentTestIncorrectAudioDict = {};
        for (let i = 0; i < objectsData.length; i++) {
          let objectData = objectsData[i];
          let objectName = objectData.object_name;
          const instructText = `Find ${objectName.toUpperCase()} in the image`;

          let questionData = {};
          questionData.questionIdx = i;
          questionData.objectName = objectData.object_name;
          questionData.objectBBoxes = objectData.object_bbox.map((bbox) => ({
            ...bbox,
            width: bbox.x2 - bbox.x1,
            height: bbox.y2 - bbox.y1,
          }));
          questionData.objectClickInstructText = instructText;
          questionData.objectClickInstructAudio =
            "data:audio/wav;base64, " +
            objectData.object_click_instruct_audio_data;
          questionData.objectClickCorrectAudio =
            "data:audio/wav;base64, " +
            objectData.object_click_correct_audio_data;
          questionData.objectClickIncorrectAudio =
            "data:audio/wav;base64, " +
            objectData.object_click_incorrect_audio_data;
          currentTestIncorrectAudioDict[questionData.objectName] = {
            objectName: questionData.objectName,
            objectClickIncorrectAudio: questionData.objectClickIncorrectAudio,
          };
          this.currentTestData.questions.push(questionData);
        }
        this.currentTestIncorrectAudios = Object.values(
          currentTestIncorrectAudioDict
        );
        this.testModeOn = true;
        this.currentQuestionIdx = 0;
        this.currentQuestionData = this.currentTestData.questions[0];
        await this.updateBBoxCoordinates();
        this.currentQuestionData = this.currentTestData.questions[0];
        return true;
      } catch (error) {
        console.error("Error:", error);
        return false;
      }
    },

    async updateBBoxCoordinates() {
      // Create an image element
      const img = new Image();
      const questions = this.currentTestData.questions;
      // Set its source to the image
      setTimeout((url) => (img.src = url), 3000, this.currentTestData.imageURL);

      // Wait for the image to load
      img.onload = () => {
        let clientWidth = null;
        let clientHeight = null;
        try {
          const clientWidthDiv = document.querySelector("#test-image-div");
          const clientHeightDiv = document.querySelector("#test-image-div");
          if (!clientWidthDiv || !clientHeightDiv) {
            setTimeout(() => console.log("Retrying"), 1000);
          }
          clientWidth = clientWidthDiv.clientWidth;
          clientHeight = clientHeightDiv.clientHeight;
        } catch (error) {
          console.log("Slow process of Test load");
          setTimeout(() => {
            clientWidth = document.querySelector("#test-image-div").clientWidth;
            clientHeight =
              document.querySelector("#test-image-div").clientHeight;
          }, 3000);
        }

        // Access the width and height of the image
        const imageNaturalWidth = img.naturalWidth;
        const imageNaturalHeight = img.naturalHeight;
        const scaleWidth = clientWidth / imageNaturalWidth;
        const scaleHeight = clientHeight / imageNaturalHeight;

        for (let i = 0; i < questions.length; i += 1) {
          const question = questions[i];
          for (let j = 0; j < question.objectBBoxes.length; j += 1) {
            const scaledX1 = question.objectBBoxes[j].x1 * scaleWidth;
            const scaledY1 = question.objectBBoxes[j].y1 * scaleHeight;
            const scaledX2 = question.objectBBoxes[j].x2 * scaleWidth;
            const scaledY2 = question.objectBBoxes[j].y2 * scaleHeight;
            const scaledWidth = question.objectBBoxes[j].width * scaleWidth;
            const scaledHeight = question.objectBBoxes[j].height * scaleHeight;

            this.currentTestData.questions[i].objectBBoxes[j].x1 = scaledX1;
            this.currentTestData.questions[i].objectBBoxes[j].y1 = scaledY1;
            this.currentTestData.questions[i].objectBBoxes[j].x2 = scaledX2;
            this.currentTestData.questions[i].objectBBoxes[j].y2 = scaledY2;
            this.currentTestData.questions[i].objectBBoxes[j].width =
              scaledWidth;
            this.currentTestData.questions[i].objectBBoxes[j].height =
              scaledHeight;
          }
        }
      };
    },

    isFirstQuestion() {
      return this.currentQuestionIdx <= 0;
    },

    isLastQuestion() {
      return (
        this.currentQuestionIdx >= this.currentTestData.questions.length - 1
      );
    },

    async handleNextImageClick() {
      this.reinstantiateTestData();
      this.currentTestIdx += 1;
      this.testModeOn = false;
      await this.fetchImageTestingData(this.currentTestIdx);
      this.playQuestionGuideAudio();
    },

    async handleAudioButtonClick(audioType) {
      let audioCtrl = null;
      switch (audioType) {
        case "oci":
          audioCtrl = this.$refs.questionGuideAudio;
          break;
        case "occ":
          audioCtrl = this.$refs.correctAnswerAudio;
          break;
        case "ocw":
          audioCtrl = this.$refs.incorrectAnswerAudio;
          break;
        default:
          audioCtrl = this.$refs.questionGuideAudio;
      }
      if (audioCtrl.paused) {
        let allAudioCtrls = [...document.querySelectorAll("audio")];
        allAudioCtrls.map(async (audioCtrl) => {
          await audioCtrl.pause();
          audioCtrl.currentTime = 0;
        });
        await audioCtrl.play();
      } else {
        await audioCtrl.pause();
        audioCtrl.currentTime = 0; // Reset to beginning
      }
    },

    async handleIncorrectAudioButtonClick(objectName) {
      const audioCtrl = document.querySelector(
        `.incorrectAudioFor${objectName[0].toUpperCase() + objectName.slice(1)}`
      );
      if (audioCtrl.paused) {
        let allAudioCtrls = [...document.querySelectorAll("audio")];
        allAudioCtrls.map(async (audioCtrl) => {
          await audioCtrl.pause();
          audioCtrl.currentTime = 0;
        });
        await audioCtrl.play();
      } else {
        await audioCtrl.pause();
        audioCtrl.currentTime = 0; // Reset to beginning
      }
      await audioCtrl.play();
    },

    playQuestionGuideAudio() {
      setTimeout(() => {
        this.handleAudioButtonClick("oci");
      }, 500);
    },

    moveToNextQuestion() {
      if (!this.isLastQuestion()) {
        this.currentQuestionIdx += 1;
        this.currentQuestionData =
          this.currentTestData.questions[this.currentQuestionIdx];
        this.reinstantiateResponseText();
        this.playQuestionGuideAudio();
      }
    },

    handleSkipQuestionClick() {
      this.moveToNextQuestion();
      this.reinstantiateResponseText();
    },

    handleImageHover(event) {
      if (this.loadingNextQuestion || this.testCompleted) {
        this.isObjectClickable = false;
        return;
      }
      // Get the coordinates of the click relative to the image
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Store the clicked coordinates
      this.clickedCoordinates = { x, y };
      let allBBoxes = [];
      this.currentTestData.questions.forEach((question) => {
        allBBoxes = allBBoxes.concat(question.objectBBoxes);
      });
      for (let i = 0; i < allBBoxes.length; i += 1) {
        let objectBBox = allBBoxes[i];

        if (
          this.clickedCoordinates.x >= objectBBox.x1 &&
          this.clickedCoordinates.x <= objectBBox.x2 &&
          this.clickedCoordinates.y >= objectBBox.y1 &&
          this.clickedCoordinates.y <= objectBBox.y2
        ) {
          this.isObjectClickable = true;
          return;
        } else {
          this.isObjectClickable = false;
        }
      }
    },

    async handleImageClick(event) {
      if (this.loadingNextQuestion || this.testCompleted) return;
      // Get the coordinates of the click relative to the image
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Store the clicked coordinates
      this.clickedCoordinates = { x, y };

      // let correctObjectName = this.currentQuestionData.objectName;

      // Check for object correctness
      for (
        let i = 0;
        i < this.currentQuestionData.objectBBoxes.length;
        i += 1
      ) {
        let objectBBox = this.currentQuestionData.objectBBoxes[i];
        if (
          this.clickedCoordinates.x >= objectBBox.x1 &&
          this.clickedCoordinates.x <= objectBBox.x2 &&
          this.clickedCoordinates.y >= objectBBox.y1 &&
          this.clickedCoordinates.y <= objectBBox.y2
        ) {
          if (this.isLastQuestion()) {
            this.testCompleted = true;
            this.clickResponseText = this.getHtmlForResponseText("last");
          } else {
            this.clickResponseText = this.getHtmlForResponseText("correct");
          }
          await this.handleAudioButtonClick("occ");
          setTimeout(() => {
            this.loadingNextQuestion = true;
          }, 2000);
          setTimeout(() => {
            this.moveToNextQuestion();
            this.loadingNextQuestion = false;
          }, 4000);
          return;
        }
      }

      const objectData = this.currentTestData.questions
        .map((item) => {
          // Iterate over each element in the objectBBoxes array and create a separate object for each
          const bboxObjects = item.objectBBoxes.map((bbox) => {
            return {
              ...item,
              objectBBoxes: bbox,
            };
          });
          return bboxObjects;
        })
        .flat(); // Flatten the array of arrays

      const objectDataCopy = JSON.parse(JSON.stringify(objectData));
      objectDataCopy.sort((a, b) => {
        const areaA = a.objectBBoxes.width + a.objectBBoxes.height;
        const areaB = b.objectBBoxes.width + b.objectBBoxes.height;
        return areaA - areaB;
      });
      const sortedObjectData = JSON.parse(JSON.stringify(objectDataCopy));

      // Check for object incorrectness
      for (let i = 0; i < sortedObjectData.length; i += 1) {
        let object = sortedObjectData[i];
        let objectBBox = object.objectBBoxes;
        let objectName = object.objectName;
        if (
          this.clickedCoordinates.x >= objectBBox.x1 &&
          this.clickedCoordinates.x <= objectBBox.x2 &&
          this.clickedCoordinates.y >= objectBBox.y1 &&
          this.clickedCoordinates.y <= objectBBox.y2
        ) {
          this.clickResponseText = this.getHtmlForResponseText(
            "incorrect",
            objectName
          );
          await this.handleIncorrectAudioButtonClick(objectName);
          return;
        }
      }
    },
  },

  components: {
    ParentNavbar,
  },
};
</script>
