<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- <index-navbar /> -->
    <parent-navbar />
    <br />
    <br />
    <section
      class="header relative items-center flex mb-24"
      :class="[learnModeOn ? 'h-screen max-h-900-px' : 'max-h-300-px']"
    >
      <div class="container mx-auto items-center justify-center flex flex-wrap">
        <div class="w-full md:w-10/12 lg:w-10/12 xl:w-10/12 px-4">
          <div
            v-if="!learnModeOn"
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
              Preparing a learning game from your image ...
            </h2>
          </div>
          <div v-if="learnModeOn" class="pt-32 sm:pt-0">
            <h2 class="mt-12 font-semibold text-4xl text-blueGray-600">
              Let's Learn Words and Alphabets with our Image Library
            </h2>
            <div class="pt-6">
              <div class="flex flex-wrap justify-between mr-auto ml-auto">
                <div
                  class="w-full w-12/12 sm:w-12/12 md:w-6/12 lg:w-6/12 mt-4 md:px-4"
                >
                  <div
                    id="learn-image-div"
                    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-emerald-500"
                  >
                    <img
                      alt="..."
                      :src="currentLearnData.markedImageData"
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
                <div
                  v-if="isObjectSelected"
                  class="w-full md:w-4/12 px-4 pt-12"
                >
                  <div
                    class="md:w-2/12 px-4 border border-solid border-blueGray-300"
                  >
                    <h5 class="font-semibold text-xl text-blueGray-600">
                      This is:
                      <span class="text-indigo-600">{{
                        selectedObjectData.objectName
                      }}</span
                      ><br />
                      Uppercase:
                      <span class="text-indigo-600">{{
                        selectedObjectData.alphabetName.toUpperCase()
                      }}</span
                      ><br />
                      Lowercase:
                      <span class="text-indigo-600">{{
                        selectedObjectData.alphabetName.toLowerCase()
                      }}</span
                      ><br />
                    </h5>
                  </div>
                  <div class="mt-12 md:w-2/12">
                    <div class="flex flex-wrap justify-between">
                      <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-6 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        @click="handleAudioButtonClick('obn')"
                      >
                        <div class="flex flex-wrap justify-between">
                          <img src="@/v2/assets/icons/audio-icon.svg" width="30" />
                          <span class="ml-3"
                            >Speak this <br />
                            word</span
                          >
                          <audio
                            id="object-name-audio"
                            ref="objectNameAudio"
                            :src="selectedObjectData.objectNameAudioData"
                            controls
                            style="display: none"
                          ></audio>
                        </div>
                      </button>
                      <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-6 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        @click="handleAudioButtonClick('ln')"
                      >
                        <div class="flex flex-wrap justify-between">
                          <img src="@/v2/assets/icons/audio-icon.svg" width="30" />
                          <span class="ml-3"
                            >Speak this <br />
                            alphabet</span
                          >
                          <audio
                            id="letter-name-audio"
                            ref="letterNameAudio"
                            :src="selectedObjectData.letterNameAudioData"
                            controls
                            style="display: none"
                          ></audio>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div
                    class="mt-12 min-h-20-px md:w-2/12 border border-solid border-blueGray-300"
                  >
                    <h5 class="font-semibold text-xl text-blueGray-600">
                      Let's practice writing!
                    </h5>
                    <div class="writing-section flex">
                      <div class="w-full">
                        <canvas
                          ref="writingCanvas"
                          class="w-full cursor-pencil border border-solid"
                          @mousedown="startDrawing"
                          @mousemove="draw"
                          @mouseup="stopDrawing"
                          @mouseleave="stopDrawing"
                          @touchmove="draw"
                        ></canvas>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="w-full text-white active:bg-emerald-600 font-bold uppercase text-base px-6 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          @click="clearDrawing"
                        >
                          <img src="@/v2/assets/icons/erase-icon.svg" width="30" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="!isObjectSelected"
                  class="w-full md:w-4/12 px-4 pt-12"
                >
                  <div
                    class="md:w-2/12 border border-solid border-blueGray-300"
                  >
                    <h5 class="font-semibold text-xl text-blueGray-600">
                      <i
                        >Now, let's click on the<br />
                        <span class="text-emerald-300">green dots</span> in
                        your<br />
                        image to start learning<br />
                        about the objects.</i
                      >
                    </h5>
                  </div>
                  <div
                    class="relative items-center flex flex-col min-w-0 break-words bg-white w-full mb-6 mt-8 sm:mt-4"
                  >
                    <img
                      alt="..."
                      width="80%"
                      src="@/v2/assets/images/image-3.2.2.jpeg"
                      class="w-60 align-middle rounded-t-lg"
                    />
                  </div>
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
    </section>
  </div>
</template>

<script>
import ParentNavbar from "@/v2/components/ParentNavbar.vue";

export default {
  data() {
    return {
      learnModeOn: false,
      currentLearnIdx: 0, // Index of next learning image
      currentLearnData: {
        originalImageData: null,
        markedImageData: null,
        objects: [],
      },
      isObjectClickable: false,
      isObjectSelected: false,
      selectedObjectData: null,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      mouseX: 0,
      mouseY: 0,
    };
  },

  mounted() {
    this.learnModeOn = false;
    this.$nextTick(async () => {
      await this.fetchImageLearningData(this.currentLearnIdx);
    });
  },

  methods: {
    reinstantiateLearnData() {
      this.currentLearnData = {
        imageURL: null,
        markedImageData: null,
        objects: [],
      };
      this.isObjectClickable = false;
      this.isObjectSelected = false;
      this.selectedObjectData = null;
      this.uploadedImage = false;
      this.learnModeOn = false;
    },

    async fetchImageLearningData(learnImageIdx) {
      try {
        const response = await fetch(
          "https://32f7-20-191-199-83.ngrok-free.app/api/load-image-learning",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
            body: JSON.stringify({ learn_image_index: learnImageIdx }),
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
          !data.image_data.learn_image_object_data ||
          data.image_data.learn_image_object_data.length === 0
        ) {
          throw new Error(
            "Error fetching objects data for the next image from the database"
          );
        }
        this.currentLearnData.originalImageData =
          data.image_data.original_image_url;
        this.currentLearnData.markedImageData =
          data.image_data.marked_image_url;
        const objectsData = data.image_data.learn_image_object_data;
        for (let i = 0; i < objectsData.length; i += 1) {
          let objectData = objectsData[i];
          let objectName = objectData.object_name;

          let objectDataToSave = {};
          objectDataToSave.objectName = objectName;
          objectDataToSave.objectBBox = {
            ...objectData.object_bbox,
            width: objectData.object_bbox.x2 - objectData.object_bbox.x1,
            height: objectData.object_bbox.y2 - objectData.object_bbox.y1,
          };
          // objectDataToSave.objectCroppedImage = `data:image/jpeg;base64, ${objectData.object_image}`;
          objectDataToSave.objectAltImage = objectData.object_image_url;
          objectDataToSave.alphabetName = objectData.alphabet_name;
          objectDataToSave.alphabetImageRef = objectData.alphabet_image_url;
          objectDataToSave.objectNameAudioData =
            "data:audio/wav;base64, " + objectData.object_name_audio_data;
          objectDataToSave.letterNameAudioData =
            "data:audio/wav;base64, " + objectData.letter_name_audio_data;
          objectDataToSave.letterSoundAudioData =
            "data:audio/wav;base64, " + objectData.letter_sound_audio_data;
          this.currentLearnData.objects.push(objectDataToSave);
        }
        this.learnModeOn = true;
        await this.updateBBoxCoordinates();
        return true;
      } catch (error) {
        console.error("Error:", error);
        return false;
      }
    },

    async updateBBoxCoordinates() {
      // Create an image element
      const img = new Image();
      // Set its source to the base64 encoded image data
      setTimeout(
        (url) => (img.src = url),
        3000,
        this.currentLearnData.markedImageData
      );

      // Wait for the image to load
      img.onload = () => {
        let clientWidth = null;
        let clientHeight = null;
        try {
          const clientWidthDiv = document.querySelector("#learn-image-div");
          const clientHeightDiv = document.querySelector("#learn-image-div");
          if (!clientWidthDiv || !clientHeightDiv) {
            setTimeout(() => console.log("Retrying"), 1000);
          }
          clientWidth = clientWidthDiv.clientWidth;
          clientHeight = clientHeightDiv.clientHeight;
        } catch (error) {
          console.log("Slow process of Learn load");
          setTimeout(() => {
            clientWidth =
              document.querySelector("#learn-image-div").clientWidth;
            clientHeight =
              document.querySelector("#learn-image-div").clientHeight;
          }, 3000);
        }

        // Access the width and height of the image
        const imageNaturalWidth = img.naturalWidth;
        const imageNaturalHeight = img.naturalHeight;
        const scaleWidth = clientWidth / imageNaturalWidth;
        const scaleHeight = clientHeight / imageNaturalHeight;

        const objects = this.currentLearnData.objects;
        for (let i = 0; i < objects.length; i += 1) {
          const object = objects[i];
          const scaledX1 = object.objectBBox.x1 * scaleWidth;
          const scaledY1 = object.objectBBox.y1 * scaleHeight;
          const scaledX2 = object.objectBBox.x2 * scaleWidth;
          const scaledY2 = object.objectBBox.y2 * scaleHeight;
          const scaledWidth = object.objectBBox.width * scaleWidth;
          const scaledHeight = object.objectBBox.height * scaleHeight;

          this.currentLearnData.objects[i].objectBBox.x1 = scaledX1;
          this.currentLearnData.objects[i].objectBBox.y1 = scaledY1;
          this.currentLearnData.objects[i].objectBBox.x2 = scaledX2;
          this.currentLearnData.objects[i].objectBBox.y2 = scaledY2;
          this.currentLearnData.objects[i].objectBBox.width = scaledWidth;
          this.currentLearnData.objects[i].objectBBox.height = scaledHeight;
        }

        const objectDataCopy = [...this.currentLearnData.objects];
        objectDataCopy.sort((a, b) => {
          const areaA = a.objectBBox.width + a.objectBBox.height;
          const areaB = b.objectBBox.width + b.objectBBox.height;
          return areaA - areaB;
        });
        this.currentLearnData.objects = JSON.parse(
          JSON.stringify(objectDataCopy)
        );
      };
    },

    handleImageHover(event) {
      // Get the coordinates of the click relative to the image
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Store the clicked coordinates
      this.clickedCoordinates = { x, y };
      let allBBoxes = this.currentLearnData.objects.map(
        (object) => object.objectBBox
      );
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
      if (!this.learnModeOn) {
        return;
      }

      // Get the coordinates of the click relative to the image
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Store the clicked coordinates
      this.clickedCoordinates = { x, y };

      for (let i = 0; i < this.currentLearnData.objects.length; i += 1) {
        let objectData = this.currentLearnData.objects[i];
        let objectBBox = objectData.objectBBox;
        if (
          this.clickedCoordinates.x >= objectBBox.x1 &&
          this.clickedCoordinates.x <= objectBBox.x2 &&
          this.clickedCoordinates.y >= objectBBox.y1 &&
          this.clickedCoordinates.y <= objectBBox.y2
        ) {
          if (this.isObjectSelected) this.clearCanvas();
          this.isObjectSelected = true;
          this.selectedObjectData = JSON.parse(JSON.stringify(objectData));
          setTimeout(() => this.addHandwritingRefToCanvas(), 3000);
          return;
        }
      }
    },

    async handleAudioButtonClick(audioType) {
      let audioCtrl = null;
      switch (audioType) {
        case "obn":
          audioCtrl = this.$refs.objectNameAudio;
          break;
        case "ln":
          audioCtrl = this.$refs.letterNameAudio;
          break;
        default:
          audioCtrl = this.$refs.objectNameAudio;
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

    async handleNextImageClick() {
      this.reinstantiateLearnData();
      this.currentLearnIdx += 1;
      this.learnModeOn = false;
      await this.fetchImageLearningData(this.currentLearnIdx);
    },

    addHandwritingRefToCanvas() {
      this.writingCanvas = this.$refs.writingCanvas;
      this.writingCanvasCtx = this.writingCanvas.getContext("2d");
      this.initDrawingCanvas();
      // Load the image
      const img = new Image();
      img.onload = () => {
        this.writingCanvasCtx.drawImage(img, 0, 0, 300, 150);
      };
      img.src = this.selectedObjectData.alphabetImageRef;
    },

    initDrawingCanvas() {
      if (!this.writingCanvas) {
        console.error("Canvas element is not rendered yet.");
        return;
      }
      if (!this.writingCanvasCtx) {
        console.error("Failed to get 2d context of canvas.");
        return;
      }
      this.writingCanvasCtx.lineWidth = 2;
      this.writingCanvasCtx.lineJoin = "round";
      this.writingCanvasCtx.lineCap = "round";
      this.writingCanvasCtx.strokeStyle = "black";
    },

    startDrawing(event) {
      this.isDrawing = true;
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;
    },

    draw(event) {
      event.preventDefault();
      if (event.type != "touchmove" && !this.isDrawing) return;
      // console.log(event.type);
      if (event.type == "touchmove") {
        const rect = event.target.getBoundingClientRect();
        this.mouseX = event.targetTouches[0].pageX - rect.left;
        this.mouseY = event.targetTouches[0].pageY - rect.top;
        // console.log(this.mouseX, this.mouseY);
      } else {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
      }
      this.writingCanvasCtx.beginPath();
      this.writingCanvasCtx.moveTo(this.lastX, this.lastY);
      this.writingCanvasCtx.lineTo(this.mouseX, this.mouseY);
      this.writingCanvasCtx.stroke();
      this.lastX = this.mouseX;
      this.lastY = this.mouseY;
    },

    stopDrawing() {
      this.isDrawing = false;
    },

    clearDrawing() {
      this.clearCanvas();
      this.addHandwritingRefToCanvas();
    },

    clearCanvas() {
      this.writingCanvasCtx.clearRect(
        0,
        0,
        this.writingCanvas.width,
        this.writingCanvas.height
      );
    },
  },

  components: {
    ParentNavbar,
  },
};
</script>
