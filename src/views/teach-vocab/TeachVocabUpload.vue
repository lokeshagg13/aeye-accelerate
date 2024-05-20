<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <index-navbar />
    <section
      class="header py-16 items-center flex flex-col"
      :class="[testModeOn ? 'max-h-900-px' : 'max-h-300-px pb-16']"
    >
      <div class="flex flex-wrap">
        <div class="w-full text-center">
          <button
            ref="parentGuideBtnRef"
            v-on:click="toggleParentGuide()"
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-2xl px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Parent's Guide
          </button>
          <div
            ref="parentGuideRef"
            v-bind:class="{
              hidden: !showParentGuide,
              block: showParentGuide,
            }"
            class="sm:w-12/12 md:w-6/12 border-2 md:mx-auto sm:mx-2 xs:mx-2 block z-50 font-normal leading-normal text-xl max-w-xs break-words rounded-lg"
          >
            <div>
              <div
                @click="closeParentGuide"
                class="flex justify-end pt-2 px-3 cursor-pointer"
              >
                <img src="@/assets/icons/close-modal-icon.svg" width="30" />
              </div>
              <div class="p-3">
                In this
                <span class="text-emerald-600"><b>Search and Find Game</b></span
                >, you can <b>click and upload pictures to the app</b>. The app
                will create a game from your picture and ask your child to
                <b> click an object in the picture</b> while positively
                reinforcing their actions. The app is <b>audio-driven</b>, hence
                making it easy to play for your young one.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showAddPictureModal"
        class="justify-center items-center flex mt--3 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div class="relative my-6 mx-auto md:m-2 sm:m-2 xs:m-2">
          <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <!--Modal Header -->
            <div
              class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
            >
              <div class="flex flex-col">
                <h3 class="text-3xl font-semibold text-left">Add a picture</h3>
                <h5
                  v-if="fileUploadError"
                  class="text-md text-red-500 text-left"
                >
                  {{ fileUploadError }}
                </h5>
              </div>
              <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                v-on:click="closeAddPictureModal()"
              >
                <span
                  class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                >
                  <img src="@/assets/icons/close-modal-icon.svg" width="30" />
                </span>
              </button>
            </div>
            <!--Modal Body -->
            <div class="p-6 flex justify-between items-center">
              <div class="flex flex-col w-6/12 items-center p-2">
                <h2 class="text-2xl">Upload a picture</h2>
                <button
                  class="mt-2 bg-emerald-300 active:bg-emerald-600 cursor-pointer text-black font-bold px-6 lg:px-12 xl:px-12 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  @click="handleImageUploadButtonClick"
                >
                  <div class="flex flex-wrap justify-between items-center">
                    <img src="@/assets/icons/upload-icon.svg" width="20" />
                    <input
                      type="file"
                      id="image-upload-input"
                      ref="imageUploadInput"
                      accept="image/*"
                      style="display: none"
                      @change="handleImageUploadChange"
                    />
                  </div>
                </button>
                <h5 v-if="uploadedFile" class="text-md text-indigo-600">
                  {{ uploadedFile.name }}
                </h5>
              </div>
              <div class="flex flex-col w-6/12 items-center p-2 border-l">
                <h2 class="text-2xl">Click and Upload a picture</h2>
                <h5 class="text-md"><i>(For mobile/tablet only)</i></h5>
                <button
                  class="bg-emerald-300 active:bg-emerald-600 cursor-pointer text-black font-bold px-6 lg:px-12 xl:px-12 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  @click="handleImageCaptureButtonClick"
                >
                  <div class="flex flex-row justify-between items-center">
                    <img src="@/assets/icons/camera-icon.svg" width="20" />
                    <span class="text-xl ml-2 mr-2">+</span>
                    <img src="@/assets/icons/upload-icon.svg" width="20" />
                  </div>
                  <input
                    type="file"
                    id="image-capture-input"
                    ref="imageCaptureInput"
                    accept="image/*"
                    capture="camera"
                    style="display: none"
                    @change="handleImageCaptureChange"
                  />
                </button>
                <h5 v-if="capturedFile" class="text-md text-indigo-600">
                  {{ capturedFile.name }}
                </h5>
              </div>
            </div>
            <!-- Modal Footer -->
            <div
              class="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-2"
            >
              <button
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                v-on:click="closeAddPictureModal()"
              >
                Close
              </button>
              <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                v-on:click="handleImageFileUploadButton()"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="showAddPictureModal"
        class="w-full h-full opacity-25 mt--9 fixed inset-0 z-40 bg-black"
      ></div>

      <div class="mx-auto items-center justify-center flex flex-wrap lg:mt-0">
        <div class="w-full md:w-12/12 lg:w-12/12 xl:w-12/12 px-4">
          <div
            v-if="!testModeOn & uploadedImage"
            class="pt-32 sm:pt-0 xs:pt-0 w-full flex flex-col items-center"
          >
            <div class="flex justify-center items-center">
              <img
                alt="..."
                src="@/assets/images/loading-mascot.gif"
                class="align-middle"
                width="200vw"
                height="300vh"
              />
            </div>
            <h2 class="font-semibold text-4xl text-blueGray-600">
              Preparing a Search and Find game for your child ...
            </h2>
          </div>
          <div
            v-if="testModeOn | (!testModeOn & !uploadedImage)"
            class="sm:pt-0"
          >
            <h2 class="mt-12 font-semibold text-4xl text-blueGray-600">
              Let's play Search and Find Objects!
            </h2>
            <h4 class="mt-2 font-semibold text-xl text-blueGray-600">
              With your Picture
            </h4>
            <div class="flex flex-wrap mr-auto ml-auto mt-8 sm:mt-4">
              <div
                class="w-full flex flex-wrap justify-between w-12/12 xs:12/12 sm:w-12/12 md:w-6/12 lg:w-6/12 md:px-4"
              >
                <div class="flex flex-wrap">
                  <button
                    class="bg-emerald-300 active:bg-emerald-600 cursor-pointer text-black max-h-5 font-bold px-6 lg:px-12 xl:px-12 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    @click="toggleAddPictureModal"
                  >
                    <div class="flex flex-wrap justify-between items-center">
                      <img
                        src="@/assets/icons/add-picture-icon.svg"
                        width="30"
                      />
                      <span class="text-2xl ml-3">Add Picture</span>
                    </div>
                  </button>
                </div>
                <div v-if="uploadedImage" class="flex flex-wrap">
                  <button
                    class="bg-indigo-200 active:bg-indigo-600 cursor-pointer text-black max-h-5 font-bold px-6 lg:px-12 xl:px-12 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    @click="handleImageClearButtonClick"
                  >
                    <div class="flex flex-wrap justify-between items-center">
                      <img src="@/assets/icons/erase-icon.svg" width="30" />
                      <span class="text-2xl ml-3">Clear Picture</span>
                    </div>
                  </button>
                </div>
              </div>
              <div
                class="flex flex-wrap justify-between md:hidden sm:hidden d:px-4"
              ></div>
            </div>
            <div class="pt-6">
              <div class="flex flex-wrap justify-between mr-auto ml-auto">
                <div
                  class="w-full xs:w-12/12 sm:w-12/12 md:w-12/12 lg:w-6/12 xl:w-6/12 mt-4 md:px-4"
                >
                  <div
                    v-if="!uploadedImage"
                    class="h-full relative flex flex-col items-center justify-center min-w-0 py-8 bg-white w-full mb-6 shadow-lg rounded-lg border"
                  >
                    <h2 class="font-semibold text-3xl text-blueGray-600">
                      Your picture<br />
                      will appear here
                    </h2>
                    <div
                      class="relative items-center flex flex-col min-w-0 break-words bg-white w-full mb-6 mt-8 sm:mt-4"
                    >
                      <img
                        alt="..."
                        src="@/assets/images/lion-mascot-reading.png"
                        class="iw-40 align-middle rounded-t-lg"
                      />
                    </div>
                  </div>
                  <div
                    v-if="uploadedImage"
                    id="test-image-div"
                    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-emerald-500"
                  >
                    <img
                      alt="..."
                      :src="currentTestData.imageURL"
                      class="w-full align-middle rounded-t-lg"
                      :class="[
                        isObjectClickable ? 'cursor-pointer-green-lg' : '',
                      ]"
                      @mousemove="handleImageHover"
                      @click="handleImageClick"
                    />
                  </div>
                  <div
                    v-if="uploadedImage"
                    class="relative flex flex-row w-full items-center justify-between lg:justify-end xl:justify-end"
                  >
                    <img
                      v-if="mascotImageType === 'default'"
                      src="@/assets/images/lion-mascot-default.png"
                      class="lg:hidden iw-20 md:imw-20 sm:imw-25 xs:imw-30"
                      alt="Lion Default"
                    />
                    <img
                      v-else-if="mascotImageType === 'correct'"
                      src="@/assets/images/lion-mascot-motivating.png"
                      class="lg:hidden iw-20 md:imw-20 sm:imw-25 xs:imw-30"
                      alt="Lion Correct"
                    />
                    <img
                      v-else-if="mascotImageType === 'incorrect'"
                      src="@/assets/images/lion-mascot-questioning.png"
                      class="lg:hidden iw-20 md:imw-20 sm:imw-25 xs:imw-30"
                      alt="Lion Incorrect"
                    />
                    <img
                      v-else-if="mascotImageType === 'last'"
                      src="@/assets/images/lion-mascot-happy.png"
                      class="lg:hidden iw-20 md:imw-20 sm:imw-25 xs:imw-30"
                      alt="Lion Happy"
                    />
                  </div>
                </div>
                <div
                  v-if="uploadedImage"
                  class="w-full lg:w-2/12 px-4 pt-12 md:pt-0 sm:pt-0 xs:pt-0 flex items-center justify-center"
                >
                  <img
                    v-if="mascotImageType === 'default'"
                    src="@/assets/images/lion-mascot-default.png"
                    class="lg:block xs:hidden sm:hidden md:hidden"
                    alt="Lion Default"
                  />
                  <img
                    v-else-if="mascotImageType === 'correct'"
                    src="@/assets/images/lion-mascot-motivating.png"
                    class="lg:block xs:hidden sm:hidden md:hidden"
                    alt="Lion Correct"
                  />
                  <img
                    v-else-if="mascotImageType === 'incorrect'"
                    src="@/assets/images/lion-mascot-questioning.png"
                    class="lg:block xs:hidden sm:hidden md:hidden"
                    alt="Lion Incorrect"
                  />
                  <img
                    v-else-if="mascotImageType === 'last'"
                    src="@/assets/images/lion-mascot-happy.png"
                    class="lg:block xs:hidden sm:hidden md:hidden"
                    alt="Lion Happy"
                  />
                </div>
                <div
                  v-if="uploadedImage"
                  class="w-full lg:w-3_5/12 px-4 pt-12 flex flex-col"
                >
                  <div class="w-full flex-grow">
                    <button
                      class="w-full bg-pink-100 text-black active:bg-pink-500 font-bold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      :class="{ 'btn-disabled': testCompleted }"
                      type="button"
                      :disabled="testCompleted"
                      @click="handleAudioButtonClick('oci')"
                    >
                      <div class="text-3xl">
                        <div
                          class="w-full flex flex-wrap justify-between"
                          v-if="!loadingNextQuestion & !testCompleted"
                        >
                          <img src="@/assets/icons/audio-icon.svg" width="30" />
                          <div
                            class="m-auto"
                            v-html="
                              this.currentQuestionData.objectClickInstructText
                            "
                          ></div>
                        </div>

                        <span
                          class="flex justify-center"
                          v-if="loadingNextQuestion & !testCompleted"
                          ><img
                            src="@/assets/images/loading-spinner.gif"
                            class="iw-4_5r"
                        /></span>
                        <span v-if="testCompleted">Hurray !!</span>

                        <audio
                          id="question-guide-audio"
                          ref="questionGuideAudio"
                          :src="currentQuestionData.objectClickInstructAudio"
                          controls
                          style="display: none"
                        ></audio>
                      </div>
                    </button>
                  </div>
                  <div class="mt-12 flex-grow">
                    <button
                      class="w-full bg-emerald-300 text-black active:bg-emerald-600 font-bold px-6 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      :class="{ 'btn-disabled': isLastQuestion() }"
                      type="button"
                      :disabled="
                        currentQuestionIdx >=
                        currentTestData.questions.length - 1
                      "
                      @click="handleSkipQuestionClick"
                    >
                      <div class="w-full flex flex-wrap justify-between">
                        <img src="@/assets/icons/skip-icon.svg" width="30" />
                        <span class="text-3xl m-auto">Skip Object</span>
                      </div>
                    </button>
                  </div>
                  <div
                    class="mt-12 min-h-20-px px-4 py-4 bg-amber-200 border border-solid border-blueGray-300 flex flex-grow items-center justify-center"
                  >
                    <h5 class="font-semibold text-xl text-black">
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
                <div v-if="!uploadedImage" class="w-full lg:w-3_5/12 px-4 pt-12">
                  <div
                    class="w-full bg-amber-200 border border-solid border-blueGray-300 p-2"
                  >
                    <h5 class="font-semibold text-xl text-blueGray-600">
                      <i
                        >To create your new Vocabulary game,<br />
                        just upload a picture of your<br />
                        choice. Our <b>Artificial Intelligence</b><br />
                        <b>(AI)</b> will perform the magic.</i
                      >
                    </h5>
                  </div>
                  <div
                    class="relative items-center flex flex-col min-w-0 break-words bg-white w-full mb-6 mt-8 sm:mt-4"
                  >
                    <img
                      alt="..."
                      src="@/assets/images/lion-mascot-teaching.png"
                      class="lg:imw-80 md:imw-40 sm:imw-40 xs:imw-40 align-middle rounded-t-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfettiDecor v-if="testCompleted" />
      <audio
        id="welcome-audio"
        ref="welcomeAudio"
        style="display: none"
        controls
      >
        <source src="@/assets/audios/lion-welcome-audio.mp3" type="audio/mp3" />
      </audio>
      <audio
        id="next-audio-upload-case"
        ref="nextAudioUploadCase"
        style="display: none"
        controls
      >
        <source src="@/assets/audios/lion-next-audio-uc.mp3" type="audio/mp3" />
      </audio>
    </section>
  </div>
</template>
<script>
import testData from "@/assets/demos/vocab_data.json";
import ConfettiDecor from "@/components/Graphics/ConfettiDecor.vue";
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";

export default {
  data() {
    return {
      showParentGuide: false,
      showAddPictureModal: false,
      uploadedFile: null,
      capturedFile: null,
      fileUploadError: null,
      uploadedImage: false,
      currentQuestionIdx: 0,
      testModeOn: false,
      currentTestData: {
        imageURL: null,
        questions: [],
      },
      currentQuestionData: null,
      currentTestIncorrectAudios: [],
      isObjectClickable: false,
      loadingNextQuestion: false,
      testCompleted: false,
      incorrectAnswerAudioData: null,
      clickResponseText: this.getHtmlForResponseText("default"),
      mascotImageType: "default",
    };
  },

  mounted() {},

  methods: {
    closeParentGuide() {
      this.showParentGuide = false;
    },

    toggleParentGuide() {
      if (this.showParentGuide) {
        this.showParentGuide = false;
      } else {
        this.showParentGuide = true;
      }
    },

    closeAddPictureModal() {
      this.showAddPictureModal = false;
    },

    toggleAddPictureModal() {
      this.showAddPictureModal = !this.showAddPictureModal;
    },

    getHtmlForResponseText(type, incorrectName) {
      switch (type) {
        case "correct":
          return `<b><span class="text-3xl">Great Job! Let's<br>keep going.</span></b>`;
        case "incorrect":
          return `<b><span class="text-3xl">Not Quite! That<br>is a <span class="text-lightBlue-400">${incorrectName.toUpperCase()}</span>. Let's<br>try again.</span></b>`;
        case "last":
          return `<b><span class="text-3xl">Well Done! Let's<br><span class="text-lightBlue-400">upload a new picture</i></span><br>for another game.</span></b>`;
        default:
          return `<b><span class="text-3xl">Click on the<br>
            <span class="text-lightBlue-400">correct object</span><br>
            as prompted.</span></b>`;
      }
    },

    reinstantiateTestData() {
      this.showParentGuide = false;
      this.showAddPictureModal = false;
      this.uploadedFile = null;
      this.capturedFile = null;
      this.fileUploadError = null;
      this.uploadedImage = false;
      this.currentQuestionIdx = 0;
      this.testModeOn = false;
      this.currentTestData = {
        imageURL: null,
        questions: [],
      };
      this.currentQuestionData = null;
      this.currentTestIncorrectAudios = [];
      this.isObjectClickable = false;
      this.loadingNextQuestion = false;
      this.testCompleted = false;
      this.incorrectAnswerAudioData = null;
      this.reinstantiateResponseText();
      this.mascotImageType = "default";
    },

    reinstantiateResponseText() {
      this.clickResponseText = this.getHtmlForResponseText("default");
      this.mascotImageType = "default";
    },

    handleImageUploadButtonClick() {
      this.fileUploadError = null;
      document.getElementById("image-upload-input").click();
    },

    handleImageCaptureButtonClick() {
      this.fileUploadError = null;
      document.getElementById("image-capture-input").click();
    },

    isValidImageFileExtension(fileName) {
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".tiff",
        ".tif",
        ".webp",
        ".svg",
      ];
      const fileExtension = fileName
        .slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2)
        .toLowerCase();
      return imageExtensions.includes("." + fileExtension);
    },

    handleImageUploadChange(event) {
      const file = event.target.files[0];
      if (!this.isValidImageFileExtension(file.name)) {
        this.fileUploadError = "Please upload a valid image file";
        return;
      }
      if (file) {
        this.capturedFile = null;
        this.uploadedFile = file;
      }
    },

    handleImageCaptureChange(event) {
      const file = event.target.files[0];
      if (!this.isValidImageFileExtension(file.name)) {
        this.fileUploadError = "Please upload a valid image file";
        return;
      }
      if (file) {
        this.capturedFile = file;
        this.uploadedFile = null;
      }
    },

    async handleImageFileUploadButton() {
      if (!this.uploadedFile && !this.capturedFile) {
        if (!this.fileUploadError) {
          this.fileUploadError =
            "Please upload a file using one of these options";
        }
        return;
      }

      let file = null;
      if (this.uploadedFile) file = this.uploadedFile;
      if (this.capturedFile) file = this.capturedFile;
      this.closeAddPictureModal();
      this.$refs.welcomeAudio.play();
      if (file) {
        await this.reinstantiateTestData();
        await this.fetchImageTestingData(file);
        await this.playQuestionGuideAudio();
      }
    },

    handleImageClearButtonClick() {
      this.reinstantiateTestData();
    },

    constructSentenceForObject(objectName) {
      if (["a", "e", "i", "o", "u"].includes(objectName[0].toLowerCase())) {
        return `That's an ${objectName.toUpperCase()}`;
      } else {
        return `That's a ${objectName.toUpperCase()}`;
      }
    },

    async fetchImageDataForDemo() {
      const data = testData;
      this.currentTestData.imageURL = data.image_data.test_image_url;
      const objectsData = data.image_data.test_image_object_data;
      let currentTestIncorrectAudioDict = {};
      for (let i = 0; i < objectsData.length; i++) {
        let objectData = objectsData[i];
        let objectName = objectData.object_name;
        const instructTextHtml = `Click <span class="text-lightBlue-600">${objectName.toUpperCase()}</span><br> in the picture`;

        let questionData = {};
        questionData.questionIdx = i;
        questionData.objectName = objectData.object_name;
        questionData.objectBBoxes = objectData.object_bbox.map((bbox) => ({
          ...bbox,
          width: bbox.x2 - bbox.x1,
          height: bbox.y2 - bbox.y1,
        }));
        questionData.objectClickInstructText = instructTextHtml;
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
    },

    async fetchImageTestingData(file) {
      try {
        this.uploadedImage = true;
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
          `https://07bf-20-5-25-56.ngrok-free.app/api/create-image-testing`,
          {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": true,
            },
            body: formData,
          }
        );
        if (!response.ok) {
          const error = await response.json();
          if (error) {
            throw new Error(error.message);
          } else {
            throw new Error("Error in fetching picture segmentation data");
          }
        }
        const data = await response.json();
        if (
          !data.image_data ||
          !data.image_data.test_image_object_data ||
          data.image_data.test_image_object_data.length === 0
        ) {
          throw new Error(
            "Error creating and fetching Test for the Picture from the database"
          );
        }
        this.currentTestData.imageURL = URL.createObjectURL(file);
        const objectsData = data.image_data.test_image_object_data;
        let currentTestIncorrectAudioDict = {};
        for (let i = 0; i < objectsData.length; i++) {
          let objectData = objectsData[i];
          let objectName = objectData.object_name;
          const instructTextHtml = `Click <span class="text-lightBlue-600">${objectName.toUpperCase()}</span><br> in the picture`;

          let questionData = {};
          questionData.questionIdx = i;
          questionData.objectName = objectData.object_name;
          questionData.objectBBoxes = objectData.object_bbox.map((bbox) => ({
            ...bbox,
            width: bbox.x2 - bbox.x1,
            height: bbox.y2 - bbox.y1,
          }));
          questionData.objectClickInstructText = instructTextHtml;
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
        this.$router.push({
          path: "/teachVocabError",
        });
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

    async handleAudioButtonClick(audioType) {
      try {
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
      } catch (error) {
        console.error(error);
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
      this.clearBoundingBox();
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
          this.drawBoundingBox(
            objectBBox.x1,
            objectBBox.y1,
            objectBBox.width,
            objectBBox.height
          );
          await this.handleAudioButtonClick("occ");
          if (this.isLastQuestion()) {
            this.mascotImageType = "last";
            this.testCompleted = true;
            this.clickResponseText = this.getHtmlForResponseText("last");
            setTimeout(() => {
              this.$refs.nextAudioUploadCase.play();
            }, 4000);
          } else {
            this.mascotImageType = "correct";
            this.clickResponseText = this.getHtmlForResponseText("correct");
          }
          this.loadingNextQuestion = true;
          setTimeout(() => {
            this.clearBoundingBox();
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
          this.drawBoundingBox(
            objectBBox.x1,
            objectBBox.y1,
            objectBBox.width,
            objectBBox.height
          );

          this.clickResponseText = this.getHtmlForResponseText(
            "incorrect",
            objectName
          );
          this.mascotImageType = "incorrect";
          await this.handleIncorrectAudioButtonClick(objectName);
          return;
        }
      }
    },

    async drawBoundingBox(x1, y1, width, height) {
      // Calculate position and size of the rectangle based on coordinates
      const rectLeft = x1;
      const rectTop = y1;
      const rectWidth = width;
      const rectHeight = height;

      // Create a div element to represent the rectangle
      const rectangleDiv = document.createElement("div");
      rectangleDiv.classList.add("bounding-box");
      rectangleDiv.style.left = rectLeft + "px";
      rectangleDiv.style.top = rectTop + "px";
      rectangleDiv.style.width = rectWidth + "px";
      rectangleDiv.style.height = rectHeight + "px";

      // Append the rectangle to the container of the image
      const imageContainer = document.getElementById("test-image-div");
      imageContainer.appendChild(rectangleDiv);
      return rectangleDiv;
    },

    async clearBoundingBox() {
      const imageContainer = document.getElementById("test-image-div");
      if (document.querySelector(".bounding-box"))
        imageContainer?.removeChild(document.querySelector(".bounding-box"));
    },
  },

  components: {
    IndexNavbar,
    ConfettiDecor,
  },
};
</script>
