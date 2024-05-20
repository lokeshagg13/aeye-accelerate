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
                <span class="text-emerald-600"><b>Count and Draw Game</b></span
                >, the app will
                <b
                  >provide pictures to your child to learn how to count from 1
                  to 9.</b
                >
                The child can click on <b>"Count with me" button </b> and our
                friend Sherry will take your child on a counting journey.
                Additionally, the app provides
                <b>support to learn to draw numbers</b>
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
              Preparing a Count and Draw game for your child ...
            </h2>
          </div>
          <div v-if="learnModeOn" class="sm:pt-0">
            <h2 class="mt-12 font-semibold text-4xl text-blueGray-600">
              Let’s Play Count and Draw!
            </h2>
            <div class="flex flex-wrap mr-auto ml-auto mt-8 sm:mt-8">
              <div
                class="w-full flex flex-wrap justify-between w-12/12 xs:12/12 sm:w-12/12 md:w-12/12 lg:w-6/12 md:px-4"
              >
                <div v-if="selectedCountIdx > 0" class="flex flex-wrap">
                  <button
                    class="bg-emerald-300 active:bg-emerald-600 cursor-pointer text-black max-h-5 font-bold px-6 lg:px-12 xl:px-12 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    @click="handlePreviousNumberClick"
                  >
                    <div class="flex flex-wrap justify-between items-center">
                      <img
                        src="@/assets/icons/arrow-left-icon.svg"
                        width="30"
                      />
                      <span class="text-2xl ml-3">Back</span>
                    </div>
                  </button>
                </div>
                <div
                  class="w-10p flex flex-wrap justify-center items-center bg-indigo-200"
                >
                  <h5 class="font-bold text-2xl text-black">
                    {{ selectedCountData?.number }}
                  </h5>
                </div>
                <div v-if="selectedCountIdx < 9" class="flex flex-wrap">
                  <button
                    class="bg-emerald-300 active:bg-emerald-600 cursor-pointer text-black max-h-5 font-bold px-6 lg:px-12 xl:px-12 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    @click="handleNextNumberClick"
                  >
                    <div class="flex flex-wrap justify-between items-center">
                      <img
                        src="@/assets/icons/arrow-right-icon.svg"
                        width="30"
                      />
                      <span class="text-2xl ml-3">Next</span>
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
                    id="learn-image-div"
                    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-emerald-500"
                  >
                    <img
                      ref="image"
                      alt="Counting Number Image"
                      :src="selectedCountData?.numberCountImage || null"
                      class="w-full h-full align-middle rounded-t-lg object-cover"
                    />
                  </div>
                  <div
                    class="relative flex flex-row w-full items-center justify-between lg:justify-end xl:justify-end"
                  >
                    <img
                      src="@/assets/images/dog-mascot-counting.png"
                      class="lg:hidden iw-20 md:imw-20 sm:imw-25 xs:imw-30"
                      alt="Dog Default"
                    />
                  </div>
                </div>
                <div
                  class="w-full lg:w-2/12 px-4 pt-12 md:pt-0 sm:pt-0 xs:pt-0 flex items-center justify-center"
                >
                  <img
                    src="@/assets/images/dog-mascot-counting.png"
                    class="lg:block xs:hidden sm:hidden md:hidden"
                    alt="Dog Default"
                  />
                </div>
                <div class="w-full lg:w-3_5/12 px-4 pt-12 flex flex-col">
                  <div
                    class="w-full flex-grow p-4 bg-pink-100 border border-solid"
                    v-html="selectedCountHtml"
                  ></div>
                  <div class="mt-12 w-full flex flex-grow">
                    <button
                      class="w-full bg-emerald-300 text-black active:bg-emerald-600 font-bold px-6 py-3 rounded-curvy shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      @click="handleUploadFileButtonClick"
                    >
                      <div
                        class="w-full flex flex-wrap justify-between"
                        @click="handleCountAudioClick"
                      >
                        <img src="@/assets/icons/audio-icon.svg" width="30" />
                        <span class="m-auto text-3xl">Count with me </span>
                        <audio
                          id="number-count-audio"
                          ref="numberCountAudio"
                          :src="selectedCountData?.numberCountAudioData"
                          controls
                          style="display: none"
                        ></audio>
                      </div>
                    </button>
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
                        id="clear-drawing"
                        class="bg-white rounded-curvy shadow-md hover:shadow-lg mr-1 mb-1 p-2"
                        @click="clearDrawing"
                      >
                        <img src="@/assets/icons/erase-icon.svg" width="30" />
                      </button>
                    </div>
                    <div class="flex">
                      <div class="flex flex-row w-full bg-white">
                        <img
                          :src="selectedCountData?.numberDrawingAnimRef"
                          class="w-6/12"
                        />
                        <canvas
                          id="writing-canvas"
                          ref="writingCanvas"
                          class="w-6/12 cursor-pencil border border-solid"
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
        <source src="@/assets/audios/dog-welcome-audio.mp3" type="audio/mp3" />
      </audio>
    </section>
  </div>
</template>
<script>
import countData from "@/assets/demos/counting_data.json";
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";

export default {
  data() {
    return {
      showParentGuide: false,
      selectedCountIdx: 0, // Index of next learning image
      learnModeOn: false,
      completeCountData: [],
      selectedCountData: null,
      selectedCountHtml: "",
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
      await this.fetchCountLearningData();
      // await this.fetchCountLearningForDemo();
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
      this.completeCountData = [];
      this.selectedCountIdx = 0;
      this.selectedCountData = null;
      this.selectedCountHtml = "";
      this.learnModeOn = false;
      this.isDrawing = false;
      this.lastX = 0;
      this.lastY = 0;
      this.mouseX = 0;
      this.mouseY = 0;
    },

    getSelectedCountHtml(number) {
      return `<h5 class="font-semibold text-2xl text-black">
                    There ${number === 1 ? "is" : "are"}:
                    <span class="text-lightBlue-600">${number} </span>
                    apple${number === 1 ? "" : "s"} in this picture`;
    },

    async fetchCountLearningForDemo() {
      const data = countData;
      const numbersData = data.numbers_data;
      for (let i = 0; i < numbersData.length; i += 1) {
        let numberData = numbersData[i];
        let numberDataToSave = {};
        numberDataToSave.number = numberData.number;
        numberDataToSave.numberCountImage = numberData.number_count_image_url;
        numberDataToSave.objectBBoxes =
          numberData.number_count_image_bboxes.map((bbox) => ({
            ...bbox,
            width: bbox.x2 - bbox.x1,
            height: bbox.y2 - bbox.y1,
          }));

        numberDataToSave.numberDrawingAnimRef =
          numberData.number_ref_anim_image_url;
        numberDataToSave.numberDrawingStaticRef =
          numberData.number_ref_static_image_url;
        numberDataToSave.numberCountAudioData =
          "data:audio/wav;base64, " + numberData.number_count_audio_data;
        this.completeCountData.push(numberDataToSave);
      }
      this.learnModeOn = true;
      await this.updateBBoxCoordinates();
      this.selectedCountData = this.completeCountData[0];
      this.selectedCountHtml = this.getSelectedCountHtml(
        this.selectedCountData.number
      );
      setTimeout(() => this.addHandwritingRefToCanvas(), 3000)
      return true;
    },

    async fetchCountLearningData() {
      try {
        const response = await fetch(
          "https://07bf-20-5-25-56.ngrok-free.app/api/load-numbers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
          }
        );
        if (!response.ok) {
          const error = await response.json();
          if (error) {
            throw new Error(error.message);
          } else {
            throw new Error("Error in fetching counting data");
          }
        }
        const data = await response.json();
        if (!data.numbers_data || data.numbers_data.length === 0) {
          throw new Error("Error fetching counting data from the database");
        }
        const numbersData = data.numbers_data;
        for (let i = 0; i < numbersData.length; i += 1) {
          let numberData = numbersData[i];
          let numberDataToSave = {};
          numberDataToSave.number = numberData.number;
          numberDataToSave.numberCountImage = numberData.number_count_image_url;
          numberDataToSave.objectBBoxes =
            numberData.number_count_image_bboxes.map((bbox) => ({
              ...bbox,
              width: bbox.x2 - bbox.x1,
              height: bbox.y2 - bbox.y1,
            }));

          numberDataToSave.numberDrawingAnimRef =
            numberData.number_ref_anim_image_url;
          numberDataToSave.numberDrawingStaticRef =
            numberData.number_ref_static_image_url;
          numberDataToSave.numberCountAudioData =
            "data:audio/wav;base64, " + numberData.number_count_audio_data;
          this.completeCountData.push(numberDataToSave);
        }
        this.learnModeOn = true;
        await this.updateBBoxCoordinates();
        this.selectedCountData = this.completeCountData[0];
        this.selectedCountHtml = this.getSelectedCountHtml(
          this.selectedCountData.number
        );
        setTimeout(() => this.addHandwritingRefToCanvas(), 3000)
        return true;
      } catch (error) {
        this.$router.push({
          path: "/teachCountingError",
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
        this.completeCountData[0].numberCountImage
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
        for (let idx = 0; idx < this.completeCountData.length; idx += 1) {
          const bboxes = this.completeCountData[idx].objectBBoxes;
          for (let b = 0; b < bboxes.length; b += 1) {
            const bbox = bboxes[b];
            const scaledX1 = bbox.x1 * scaleWidth;
            const scaledY1 = bbox.y1 * scaleHeight;
            const scaledX2 = bbox.x2 * scaleWidth;
            const scaledY2 = bbox.y2 * scaleHeight;
            const scaledWidth = bbox.width * scaleWidth;
            const scaledHeight = bbox.height * scaleHeight;

            this.completeCountData[idx].objectBBoxes[b].x1 = scaledX1;
            this.completeCountData[idx].objectBBoxes[b].y1 = scaledY1;
            this.completeCountData[idx].objectBBoxes[b].x2 = scaledX2;
            this.completeCountData[idx].objectBBoxes[b].y2 = scaledY2;
            this.completeCountData[idx].objectBBoxes[b].width = scaledWidth;
            this.completeCountData[idx].objectBBoxes[b].height = scaledHeight;
          }
        }
      };
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
      rectangleDiv.classList.add("count-bounding-box");
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
      if (document.querySelector(".count-bounding-box"))
        imageContainer?.removeChild(
          document.querySelector(".count-bounding-box")
        );
    },

    async handleCountAudioClick() {
      const audioCtrl = this.$refs.numberCountAudio;
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

      const objectBBoxes = this.selectedCountData.objectBBoxes;
      const initialTimeout = 3500;
      const countIntervalTime = 2300;
      this.intervalID;
      let currentBBoxIndex = 0;
      function drawNextBoundingBox(drawBoundingBoxFunc, clearBoundingBoxFunc) {
        console.log(currentBBoxIndex);
        if (currentBBoxIndex < objectBBoxes.length) {
          const { x1, y1, width, height } = objectBBoxes[currentBBoxIndex];
          clearBoundingBoxFunc();
          drawBoundingBoxFunc(x1, y1, width, height);
          currentBBoxIndex++;
        } else {
          clearInterval(this.intervalID);
        }
      }

      setTimeout(
        (drawBoundingBoxFunc, clearBoundingBoxFunc) => {
          this.intervalID = setInterval(
            drawNextBoundingBox,
            countIntervalTime,
            drawBoundingBoxFunc,
            clearBoundingBoxFunc
          );
        },
        initialTimeout,
        this.drawBoundingBox,
        this.clearBoundingBox
      );
    },

    async handleNextNumberClick() {
      if (this.intervalID) clearInterval(this.intervalID);
      this.clearBoundingBox();
      if (this.selectedCountIdx >= 9) this.selectedCountIdx = 0;
      else this.selectedCountIdx += 1;
      this.selectedCountData = this.completeCountData[this.selectedCountIdx];
      this.selectedCountHtml = this.getSelectedCountHtml(
        this.selectedCountData.number
      );
      this.addHandwritingRefToCanvas();
    },

    async handlePreviousNumberClick() {
      if (this.intervalID) clearInterval(this.intervalID);
      this.clearBoundingBox();
      if (this.selectedCountIdx <= 0) this.selectedCountIdx = 9;
      else this.selectedCountIdx -= 1;
      this.selectedCountData = this.completeCountData[this.selectedCountIdx];
      this.selectedCountHtml = this.getSelectedCountHtml(
        this.selectedCountData.number
      );
      this.addHandwritingRefToCanvas();
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
      img.src = this.selectedCountData.numberDrawingStaticRef;
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
