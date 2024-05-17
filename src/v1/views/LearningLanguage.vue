<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <PageHeader />
  <div class="body">
    <div class="page-title">Learning Language with You</div>
    <div class="image-div">
      <div class="image-controls">
        <input
          type="file"
          id="file-input"
          ref="fileInput"
          style="display: none"
          @change="handleFileUpload"
        />
        <button class="file-upload-button" @click="handleUploadFileButton">
          Upload your<br />image here
        </button>
        <p v-if="processingImage">
          Processing the image. It may take about 30 seconds...
        </p>
        <p v-if="segmentationError">{{ this.segmentationError }}</p>
        <button
          class="clear-upload-button"
          v-if="uploadedImage"
          @click="clearUploadedFile"
        >
          Clear Uploaded <br />Image
        </button>
      </div>
      <div class="uploaded-image-div">
        <p class="uploaded-image-placeholder" v-if="!uploadedImage">
          Your Image will show up here
        </p>
        <img
          class="uploaded-image"
          v-if="uploadedImage"
          :src="uploadedImage"
          @click="handleImageClick"
        />
      </div>
    </div>

    <div class="fetch-wait-modal" v-if="fetchingObjectData">
      <div class="popup-content">
        <img
          id="loading-image"
          src="@/v1/assets/loading-mascot.gif"
          alt="Fetching Data"
        />
        <!-- <div>
          https://giphy.com/gifs/juggling-load-malabares-gJ3mEToTDJn3LT6kCT
        </div> -->
        <div>Fetching the Object's data...</div>
      </div>
    </div>

    <div class="object-popup-modal" v-if="objectPopupShowing">
      <div class="popup-content" ref="scrollableContent">
        <div class="popup-close-btn" @click="hideObjectPopup">X</div>
        <div class="object-data-div">
          <div class="object-images">
            <div class="object-cropped-image">
              <img
                :src="selectedObject.objectCroppedImage"
                alt="Cropped image"
                class="object-cropped-image"
              />
            </div>
            <div class="object-alt-image">
              <img
                :src="selectedObject.objectAltImage"
                alt="Object Alternate image"
                class="object-alt-image"
              />
            </div>
          </div>
          <div class="object-info-div">
            <div class="object-alphabet-info">
              <b>{{
                selectedObject.objectName.charAt(0).toUpperCase() +
                selectedObject.objectName.slice(1).toLowerCase()
              }}</b>
              <br />Uppercase:
              <b>{{ selectedObject.objectName[0].toUpperCase() }}</b>
              <br />Lowercase:
              <b> {{ selectedObject.objectName[0].toLowerCase() }}</b>
            </div>
            <div class="object-controls">
              <audio
                id="object-name-audio"
                ref="objectNameAudio"
                :src="selectedObject.objectNameAudioData"
                controls
                style="display: none"
              ></audio>
              <button
                type="button"
                id="object-name-audio-btn"
                @click="handleAudioButtonClick('obn')"
              >
                Speak Object Name
              </button>
              <audio
                id="letter-name-audio"
                ref="letterNameAudio"
                :src="selectedObject.letterNameAudioData"
                controls
                style="display: none"
              ></audio>
              <button
                type="button"
                id="letter-name-audio-btn"
                @click="handleAudioButtonClick('ln')"
              >
                Speak Alphabet Name
              </button>
              <audio
                id="letter-sound-audio"
                ref="letterSoundAudio"
                :src="selectedObject.letterSoundAudioData"
                controls
                style="display: none"
              ></audio>
              <button
                type="button"
                id="letter-sound-audio-btn"
                @click="handleAudioButtonClick('ls')"
              >
                Speak Alphabet Sound
              </button>
            </div>
          </div>
        </div>
        <div class="scroll-bottom-div">
          <button
            class="scroll-bottom-button"
            @click="handleHandwritingButtonClick"
          >
            Practice Handwriting
          </button>
        </div>
        <div class="writing-section">
          <div class="writing-canvas-div">
            <canvas
              ref="writingCanvas"
              class="input-pad"
              @mousedown="startDrawing"
              @mousemove="draw"
              @mouseup="stopDrawing"
              @mouseleave="stopDrawing"
              @touchstart="startDrawing"
              @touchmove="draw"
              @touchend="stopDrawing"
            ></canvas>
          </div>
          <div class="writing-controls">
            <button type="button" id="canvas-clear-button" @click="clearCanvas">
              Clear
            </button>
            <!-- <button type="button" id="suggestions-button" @click="clearCanvas">
              Suggestions
            </button>
            <button
              type="button"
              id="canvas-submit-button"
              @click="clearCanvas"
            >
              Submit
            </button> -->
          </div>
        </div>
      </div>
    </div>

    <div
      class="error-popup-modal"
      v-if="errorPopupShowing"
      @click="hideErrorPopup"
    >
      <div class="popup-content">
        <div class="popup-close-btn" @click="hideErrorPopup">X</div>
        <div class="popup-message">
          {{ fetchObjectDataError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";

export default {
  name: "LearningLanguageV1",
  components: {
    PageHeader,
  },
  data() {
    return {
      pageTitle: "Learning Language with You",
      uploadedImage: null,
      processingImage: false,
      fetchingObjectData: false,
      segmentationError: null,
      fetchObjectDataError: null,
      objectPopupShowing: false,
      errorPopupShowing: false,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      mouseX: 0,
      mouseY: 0,
      selectedObject: null,
      objectData: [],
    };
  },

  methods: {
    handleUploadFileButton() {
      document.getElementById("file-input").click();
    },

    async handleFileUpload(event) {
      this.segmentationError = null;
      const file = event.target.files[0];
      if (file) {
        await this.fetchImageSegmentationData(file);
      }
    },

    async fetchImageSegmentationData(file) {
      this.processingImage = true;
      document.querySelector("div.image-controls").style.justifyContent =
        "space-between";
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          "https://5033-20-5-25-56.ngrok-free.app/api/segment-image",
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
            throw new Error("Error in the Image Segmentation AI model");
          }
        }
        const data = await response.json();
        if (!data.object_data || data.object_data.length === 0) {
          throw new Error("No objects found in the image");
        }
        for (let i = 0; i < data.object_data.length; i += 1) {
          const objectDict = data.object_data[i];
          let objectDatum = {
            objectName: objectDict.class_name,
            objectBbox: {
              x: objectDict.bbox.x1,
              y: objectDict.bbox.y1,
              width: objectDict.bbox.x2 - objectDict.bbox.x1,
              height: objectDict.bbox.y2 - objectDict.bbox.y1,
            },
            objectCroppedImage: `data:image/jpeg;base64, ${objectDict.image}`,
            objectAltImage: null,
            objectHandwritingRef: null,
            objectNameAudioData: null,
            letterNameAudioData: null,
            letterSoundAudioData: null,
          };
          this.objectData.push(objectDatum);
        }
        // console.log(this.objectData);
        const objectImageData = `data:image/jpeg;base64, ${data.object_image}`;
        await this.updateBBoxCoordinates(objectImageData);
        this.uploadedImage = objectImageData;
        this.processingImage = false;
        return true;
      } catch (error) {
        console.error("Error:", error);
        this.processingImage = false;
        this.segmentationError = error.message;
        return false;
      }
    },

    async updateBBoxCoordinates(objectImageData) {
      // Create an image element
      const img = new Image();
      // Set its source to the base64 encoded image data
      img.src = objectImageData;

      // Wait for the image to load
      img.onload = () => {
        const clientWidth = document.querySelector(
          ".uploaded-image-div"
        ).clientWidth;
        const clientHeight = document.querySelector(
          ".uploaded-image-div"
        ).clientHeight;

        // Access the width and height of the image
        const imageNaturalWidth = img.naturalWidth;
        const imageNaturalHeight = img.naturalHeight;
        const scaleWidth = clientWidth / imageNaturalWidth;
        const scaleHeight = clientHeight / imageNaturalHeight;

        for (let i = 0; i < this.objectData.length; i += 1) {
          const objectDatum = this.objectData[i];
          const scaledX = objectDatum.objectBbox.x * scaleWidth;
          const scaledY = objectDatum.objectBbox.y * scaleHeight;
          const scaledWidth = objectDatum.objectBbox.width * scaleWidth;
          const scaledHeight = objectDatum.objectBbox.height * scaleHeight;

          this.objectData[i].objectBbox.x = scaledX;
          this.objectData[i].objectBbox.y = scaledY;
          this.objectData[i].objectBbox.width = scaledWidth;
          this.objectData[i].objectBbox.height = scaledHeight;
        }

        const objectDataCopy = [...this.objectData];
        objectDataCopy.sort((a, b) => {
          const areaA = a.objectBbox.width + a.objectBbox.height;
          const areaB = b.objectBbox.width + b.objectBbox.height;
          return areaA - areaB;
        });
        this.objectData = JSON.parse(JSON.stringify(objectDataCopy));
        // console.log(this.objectData);
      };
    },

    clearUploadedFile() {
      this.uploadedImage = null;
      this.segmentationError = null;
      this.processingImage = false;
      this.fetchingObjectData = false;
      this.fetchObjectDataError = null;
      this.objectPopupShowing = false;
      this.errorPopupShowing = false;
      this.isDrawing = false;
      this.lastX = 0;
      this.lastY = 0;
      this.mouseX = 0;
      this.mouseY = 0;
      this.selectedObject = null;
      this.objectData = [];
      document.querySelector("div.image-controls").style.justifyContent =
        "center";
      // Clear the file selected in the input so that the change event can be triggered again if the user selects the same image
      this.$refs.fileInput.value = "";
    },

    async handleImageClick(event) {
      if (!this.uploadedImage) {
        return;
      }

      // Get the coordinates of the click relative to the image
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Store the clicked coordinates
      this.clickedCoordinates = { x, y };
      // console.log(this.clickedCoordinates);

      for (let i = 0; i < this.objectData.length; i += 1) {
        let objectDatum = this.objectData[i];
        let objectBbox = objectDatum.objectBbox;
        // console.log(objectDatum.objectName, objectBbox);

        if (
          this.clickedCoordinates.x >= objectBbox.x &&
          this.clickedCoordinates.x <= objectBbox.x + objectBbox.width &&
          this.clickedCoordinates.y >= objectBbox.y &&
          this.clickedCoordinates.y <= objectBbox.y + objectBbox.height
        ) {
          // If inside the bounding box
          // console.log(objectDatum.objectName);
          const fetchResponse = await this.fetchObjectData(
            i,
            objectDatum.objectName
          );
          // console.log(fetchResponse);

          if (fetchResponse === true) {
            this.selectedObject = this.objectData[i];
            this.hideErrorPopup();
            this.objectPopupShowing = true;
          } else {
            this.selectedObject = null;
            this.hideObjectPopup();
            this.errorPopupShowing = true;
          }
          return;
        } else {
          // If outside the bounding box
          this.selectedObject = null;
          this.objectPopupShowing = false;
        }
      }
    },

    async fetchObjectData(objectIdx, objectName) {
      try {
        if (
          this.objectData[objectIdx].objectAltImage !== null &&
          this.objectData[objectIdx].objectHandwritingRef !== null &&
          this.objectData[objectIdx].objectNameAudioData !== null &&
          this.objectData[objectIdx].letterNameAudioData !== null &&
          this.objectData[objectIdx].letterSoundAudioData !== null
        )
          return true;
        this.fetchingObjectData = true;
        const response = await fetch(
          "https://5033-20-5-25-56.ngrok-free.app/api/load-object-learning",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
            body: JSON.stringify({ object_name: objectName }),
          }
        );
        if (!response.ok) {
          const error = await response.json();
          if (error) {
            throw new Error(error.message);
          } else {
            throw new Error(
              "Error while fetching object info from the database"
            );
          }
        }
        const data = await response.json();
        if (
          !data.object_image_url ||
          !data.alphabet_image_url ||
          !data.object_name_audio_data ||
          !data.letter_name_audio_data ||
          !data.letter_sound_audio_data
        ) {
          throw new Error("No objects found in the image");
        }
        this.objectData[objectIdx].objectAltImage = data.object_image_url;
        this.objectData[objectIdx].objectHandwritingRef =
          data.alphabet_image_url;
        this.objectData[objectIdx].objectNameAudioData =
          "data:audio/wav;base64, " + data.object_name_audio_data;
        this.objectData[objectIdx].letterNameAudioData =
          "data:audio/wav;base64, " + data.letter_name_audio_data;
        this.objectData[objectIdx].letterSoundAudioData =
          "data:audio/wav;base64, " + data.letter_sound_audio_data;
        this.fetchingObjectData = false;
        return true;
      } catch (error) {
        console.error("Error:", error);
        this.fetchingObjectData = false;
        this.fetchObjectDataError = error.message;
        return false;
      }
    },

    hideObjectPopup() {
      this.objectPopupShowing = false;
    },

    hideErrorPopup() {
      this.errorPopupShowing = false;
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

    handleHandwritingButtonClick() {
      // Get the scrollable content element
      const scrollableContent1 = this.$refs.scrollableContent;
      // Scroll to the bottom with smooth animation
      scrollableContent1.scrollTo({
        top: scrollableContent1.scrollHeight,
        behavior: "smooth",
      });
      this.addHandwritingRefToCanvas();
    },

    addHandwritingRefToCanvas() {
      this.writingCanvas = this.$refs.writingCanvas;
      this.writingCanvasCtx = this.writingCanvas.getContext("2d");
      this.initCanvas();
      // Load the image
      const img = new Image();
      img.onload = () => {
        this.writingCanvasCtx.drawImage(img, 0, 0, 300, 150);
      };
      img.src = this.selectedObject.objectHandwritingRef;
    },

    initCanvas() {
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
      if (!this.isDrawing) return;
      console.log(event.type);
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
      // console.log("last", this.lastX, this.lastY);
      // console.log("curr", this.mouseX, this.mouseY);
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

    clearCanvas() {
      this.writingCanvasCtx.clearRect(
        0,
        0,
        this.writingCanvas.width,
        this.writingCanvas.height
      );
      this.addHandwritingRefToCanvas();
    },
  },
};
</script>

<style scoped>
.body {
  min-height: 100vh;
  z-index: 2;
  background-color: #dfe9d5;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 30px;
  font-weight: bold;
}

.image-div {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-controls {
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.file-upload-button {
  cursor: pointer;
  width: 40%;
  height: 3rem;
  border-radius: 10px;
  border: 1px solid;
  background-color: #c5e4a0;
}

.clear-upload-button {
  cursor: pointer;
  width: 40%;
  height: 3rem;
  border-radius: 10px;
  border: 1px solid;
  background-color: #e9d6ba;
}

.uploaded-image-div {
  width: 70%;
  height: 25rem;
  background-color: #d3e1e2;
  display: flex;
  border-radius: 10px;
  border: 1px solid;
  align-items: center;
  justify-content: center;
}

.uploaded-image-placeholder {
  font-family: "Roboto Condensed", sans-serif;
  font-optical-sizing: auto;
  font-size: 40px;
  font-style: italic;
  font-weight: 100;
}

.uploaded-image {
  width: 100%;
  height: 100%;
}

/* popupModal styles */
.object-popup-modal,
.error-popup-modal,
.fetch-wait-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  /* Vertical layout */
}

.popup-content {
  background-color: white;
  padding: 10px 20px 20px 20px;
  border: 2px solid #333;
  width: 50%;
}

.object-popup-modal .popup-content {
  max-height: 56%;
  overflow-y: auto;
}

.error-popup-modal .popup-content {
  height: 30%;
}

.fetch-wait-modal .popup-content {
  height: 50%;
}

.popup-close-btn {
  text-align: right;
  cursor: pointer;
  /* Cursor style */
}

.object-data-div {
  display: flex;
  align-items: center;
}

.object-images {
  width: 75%;
  height: 100%;
}

.object-cropped-image {
  max-height: 205px;
}

.object-alt-image {
  width: 100%;
  height: 100%;
  max-height: 205px;
}

.object-info-div {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.object-alphabet-info {
  background-color: #e9d6ba;
  text-align: center;
  padding: 2px 14px;
  border: 1px solid;
  width: 40%;
  margin-bottom: 5px;
}

.object-controls {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.object-controls button {
  padding: 10px;
  background-color: #e2d2d8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin: 10px 0px;
}

.object-controls button:hover {
  background-color: #c2b2b8;
}

#loading-image {
  width: 40%;
}

#loading-image + div {
  font-size: 20px;
}

.scroll-bottom-div {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  padding: 10px;
}

.scroll-bottom-button {
  padding: 10px;
  background-color: #d3e1e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0px;
}

.scroll-bottom-button:hover {
  background-color: #b1c8ca;
}

#file-input {
  display: none;
}

.writing-section {
  display: flex;
}

.writing-canvas-div {
  width: 1000px;
}

.writing-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

#canvas-clear-button {
  padding: 10px;
  background-color: #d3e1e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin: 10px 0px;
}

#canvas-clear-button:hover {
  background-color: #b1c8ca;
}

#suggestions-button {
  padding: 10px;
  background-color: #e2d2d8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin: 10px 0px;
}

#suggestions-button:hover {
  background-color: #c2b2b8;
}

#canvas-submit-button {
  padding: 10px;
  background-color: #c5e4a0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin: 10px 0px;
}

#canvas-submit-button:hover {
  background-color: #a5e4a1;
}

.input-pad {
  width: 300;
  height: 150;
  /*max-width: 400px;
  max-height: 400px;*/
  border: 1px solid black;
  cursor: url("@/v1/assets/drawing.svg") 0 22, auto;
}

.submit-icon {
  width: 100%;
  margin-top: 10px;
  /* Adjust spacing from the element above */
  text-align: center;
  /* Center align text */
}
</style>
