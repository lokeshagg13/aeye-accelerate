<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <index-navbar />
    <section
      class="header py-16 items-center flex flex-col"
      :class="[learnModeOn ? 'max-h-900-px' : 'max-h-300-px pb-16']"
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
                <span class="text-emerald-600"
                  ><b>Mighty Rabbit Says Game</b></span
                >, the app will <b>provide pictures to your child</b>. The child
                can
                <b>click any objects (shown using green dots) in the picture</b>
                and learn how to say different words and letters.
                Additionally, the app provides
                <b>support to draw the alphabet</b>
                associated with the object.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto items-center justify-center flex flex-wrap lg:mt-0">
        <div class="w-full md:w-12/12 lg:w-12/12 xl:w-12/12 px-4">
          <div
            v-if="!learnModeOn"
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
              Preparing a Mighty Rabbit Says game for your child ...
            </h2>
          </div>
          <div v-if="learnModeOn" class="sm:pt-0">
            <h2 class="mt-12 font-semibold text-4xl text-blueGray-600">
              Let's play Mighty Rabbit Says!
            </h2>
            <div class="pt-6">
              <div class="flex flex-wrap justify-between mr-auto ml-auto">
                <div
                  class="w-full xs:w-12/12 sm:w-12/12 md:w-12/12 lg:w-6/12 xl:w-6/12 mt-4 md:px-4"
                >
                  <div
                    id="learn-image-div"
                    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-emerald-500"
                  >
                    <img
                      alt="..."
                      :src="currentLearnData.markedImageData"
                      class="w-full align-middle rounded-t-lg"
                      :class="[
                        isObjectClickable ? 'cursor-pointer-green-lg' : '',
                      ]"
                      @mousemove="handleImageHover"
                      @click="handleImageClick"
                    />
                  </div>
                  <div
                    class="relative flex flex-row w-full items-center justify-between lg:justify-end xl:justify-end"
                  >
                    <img
                      src="@/assets/images/rabbit-mascot-default.png"
                      class="lg:hidden iw-20 md:imw-20 sm:imw-25 xs:imw-30"
                      alt="Rabbit Default"
                    />

                    <button
                      class="bg-emerald-300 active:bg-emerald-600 cursor-pointer text-black max-h-5 font-bold px-6 lg:px-12 xl:px-12 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      @click="handleNextImageClick"
                    >
                      <div class="flex flex-wrap justify-between items-center">
                        <span class="text-2xl mr-3">Next Picture</span>
                        <img
                          src="@/assets/icons/arrow-right-icon.svg"
                          width="20"
                        />
                      </div>
                    </button>
                  </div>
                </div>
                <div
                  v-if="isObjectSelected"
                  class="w-full lg:w-2/12 px-4 pt-12 md:pt-0 sm:pt-0 xs:pt-0 flex items-center justify-center"
                >
                  <img
                    src="@/assets/images/rabbit-mascot-default.png"
                    class="lg:block xs:hidden sm:hidden md:hidden"
                    alt="Rabbit Default"
                  />
                </div>
                <div
                  v-if="isObjectSelected"
                  class="w-full lg:w-3_5/12 px-4 pt-12 flex flex-col"
                >
                  <div
                    class="w-full flex-grow p-4 bg-pink-100 border border-solid"
                    v-html="selectedObjectNameHtml"
                  ></div>
                  <div class="mt-12 w-full flex-grow">
                    <div class="flex flex-wrap justify-between">
                      <button
                        class="bg-emerald-300 text-black active:bg-emerald-600 font-bold px-6 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        @click="handleAudioButtonClick('obn')"
                      >
                        <div class="flex flex-wrap justify-between">
                          <img src="@/assets/icons/audio-icon.svg" width="30" />
                          <span class="ml-3 text-xl"
                            >Say this <br />
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
                        class="bg-emerald-300 text-black active:bg-emerald-600 font-bold px-6 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        @click="handleAudioButtonClick('ls')"
                      >
                        <div class="flex flex-wrap justify-between">
                          <img src="@/assets/icons/audio-icon.svg" width="30" />
                          <span class="ml-3 text-xl"
                            >Say this <br />
                            letter</span
                          >
                          <audio
                            id="letter-sound-audio"
                            ref="letterSoundAudio"
                            :src="selectedObjectData.letterSoundAudioData"
                            controls
                            style="display: none"
                          ></audio>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div
                    class="mt-12 flex-grow min-h-20-px border border-solid border-blueGray-300 bg-amber-200"
                  >
                    <div class="flex flex-row justify-between items-center">
                      <h5 class="font-semibold text-2xl text-black ml-2">
                        Let's practice writing!
                      </h5>
                      <button
                        type="button"
                        class="bg-white rounded-curvy shadow-md hover:shadow-lg mr-1 mb-1 p-2"
                        @click="clearDrawing"
                      >
                        <img src="@/assets/icons/erase-icon.svg" width="30" />
                      </button>
                    </div>
                    <div class="writing-section flex">
                      <div class="w-full bg-white">
                        <canvas
                          id="writing-canvas"
                          ref="writingCanvas"
                          class="w-full cursor-pencil border border-solid"
                          @mousedown="startDrawing"
                          @mousemove="draw"
                          @mouseup="stopDrawing"
                          @mouseleave="stopDrawing"
                          @touchstart="startDrawing"
                          @touchmove="draw"
                          @touchend="stopDrawing"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="!isObjectSelected"
                  class="w-full lg:w-3_5/12 px-4 pt-12"
                >
                  <div
                    class="w-full bg-amber-200 border border-solid border-blueGray-300"
                  >
                    <h5 class="font-semibold text-2xl text-black">
                      <i
                        >Click on the
                        <span class="text-emerald-500">green dots</span> in this
                        picture to start playing the game.</i
                      >
                    </h5>
                  </div>
                  <div
                    class="relative items-center flex flex-col min-w-0 break-words bg-white w-full mb-6 mt-8 sm:mt-4"
                  >
                    <img
                      alt="..."
                      src="@/assets/images/rabbit-mascot-motivating.png"
                      class="lg:imw-80 md:imw-40 sm:imw-40 xs:imw-40 align-middle rounded-t-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio
        id="welcome-audio"
        ref="welcomeAudio"
        style="display: none"
        controls
      >
        <source
          src="@/assets/audios/rabbit-welcome-audio.mp3"
          type="audio/mp3"
        />
      </audio>
    </section>
  </div>
</template>
<script>
import learnData from "@/assets/demos/alphabet_data.json";
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";

export default {
  data() {
    return {
      showParentGuide: false,
      currentLearnIdx: 0, // Index of next learning image
      learnModeOn: false,
      currentLearnData: {
        originalImageData: null,
        markedImageData: null,
        objects: [],
      },
      isObjectClickable: false,
      isObjectSelected: false,
      selectedObjectData: null,
      selectedObjectNameHtml: "",
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      mouseX: 0,
      mouseY: 0,
    };
  },

  mounted() {
    this.learnModeOn = false;
    this.$refs.welcomeAudio.play();
    this.$nextTick(async () => {
      await this.fetchImageLearningData(this.currentLearnIdx);
      // await this.fetchImageLearningForDemo();
    });
  },

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

    reinstantiateLearnData() {
      this.currentLearnData = {
        imageURL: null,
        markedImageData: null,
        objects: [],
      };
      this.isObjectClickable = false;
      this.isObjectSelected = false;
      this.selectedObjectData = null;
      this.learnModeOn = false;
      this.isDrawing = false;
      this.lastX = 0;
      this.lastY = 0;
      this.mouseX = 0;
      this.mouseY = 0;
    },

    getSelectedObjectNameHtml(objectName) {
      let article = "A";
      if (["a", "e", "i", "o", "u"].includes(objectName[0].toLowerCase()))
        article = "An";
      return `<h5 class="font-semibold text-2xl text-black">
                This is: ${article} <span class="text-lightBlue-600">${objectName.toLowerCase()} </span>
              </h5>`;
    },

    async fetchImageLearningForDemo() {
      const data = learnData;
      this.currentLearnData.originalImageData =
        data.image_data.original_image_url;
      this.currentLearnData.markedImageData = data.image_data.marked_image_url;
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
    },

    async fetchImageLearningData(learnImageIdx) {
      try {
        const response = await fetch(
          "https://c330-20-191-199-83.ngrok-free.app/api/load-image-learning",
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
        this.$router.push({
          path: "/teachAlphabetError",
        });
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
          this.selectedObjectNameHtml = this.getSelectedObjectNameHtml(
            this.selectedObjectData.objectName
          );
          this.drawBoundingBox(
            objectBBox.x1,
            objectBBox.y1,
            objectBBox.width,
            objectBBox.height
          );
          setTimeout(() => this.addHandwritingRefToCanvas(), 3000);
          return;
        }
      }
    },

    async drawBoundingBox(x1, y1, width, height) {
      // Clear any bounding box
      this.clearBoundingBox();

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
      const imageContainer = document.getElementById("learn-image-div");
      imageContainer.appendChild(rectangleDiv);
      return rectangleDiv;
    },

    async clearBoundingBox() {
      const imageContainer = document.getElementById("learn-image-div");
      if (document.querySelector(".bounding-box"))
        imageContainer?.removeChild(document.querySelector(".bounding-box"));
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
        case "ls":
          audioCtrl = this.$refs.letterSoundAudio;
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
      const clientWidth = document.getElementById("writing-canvas").clientWidth;
      const clientHeight =
        document.getElementById("writing-canvas").clientHeight;
      this.writingCanvas.width = clientWidth;
      this.writingCanvas.height = clientHeight;
      this.initDrawingCanvas();
      // Load the image
      const img = new Image();
      img.onload = () => {
        this.writingCanvasCtx.drawImage(
          img,
          0,
          0,
          this.writingCanvas.width,
          this.writingCanvas.height
        );
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

    getCanvasTouchPosition(event) {
      const rect = this.writingCanvas.getBoundingClientRect();
      const touch = event.touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    },

    startDrawing(event) {
      this.isDrawing = true;
      if (event.type == "touchstart") {
        const touchOffsetCoords = this.getCanvasTouchPosition(event);
        this.lastX = touchOffsetCoords.offsetX;
        this.lastY = touchOffsetCoords.offsetY;
      } else {
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;
      }
    },

    draw(event) {
      event.preventDefault();
      if (!this.isDrawing) return;
      // console.log(event.type);
      if (event.type == "touchmove") {
        const touchOffsetCoords = this.getCanvasTouchPosition(event);
        this.mouseX = touchOffsetCoords.offsetX;
        this.mouseY = touchOffsetCoords.offsetY;
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
    IndexNavbar,
  },
};
</script>
