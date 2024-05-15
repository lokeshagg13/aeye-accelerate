<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <parent-navbar />
    <section class="header pt-16 items-center flex h-screen max-h-660-px">
      <div class="container mx-auto items-center flex flex-wrap mt-32 pt-16 lg:mt-0">
        <img
          class="mt-12 md:absolute md:b-auto md:right-0 lg:absolute lg:top-full lg:b-auto lg:right-0 sm:relative md:absolute lg:absolute"
          :src="homePageImage" alt="..." style="z-index: -1" />

        <div class="w-full md:w-10/12 lg:w-6/12 xl:w-6/12 px-4">
          <div class="pt-8 pb-8 sm:pt-0">
            <h2 class="font-semibold text-4xl text-blueGray-600">
              Welcome to A.EYE
            </h2>
            <p class="mt-4 text-lg leading-relaxed text-blueGray-500">
              A.EYE makes learning more accessible and fun while supporting
              parents on their children’s educational journeys.
            </p>
            <div class="w-full px-4 mt-8">
              <div class="flex flex-wrap">
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col mt-4 shadow-lg p-6 bg-white rounded-lg" style="
                      background-color: rgba(2, 132, 199, 0.55);
                      color: white;
                    ">
                    <div class="px-4 py-5 flex-auto">
                      <a href="/v2/learningLanguage">
                        <i class="fas fa-sitemap" />
                        Use our Image Library to teach Words and Alphabet.
                      </a>
                    </div>
                  </div>
                  <div class="relative flex flex-col min-w-0 mt-4 shadow-lg p-6 bg-white rounded-lg" style="
                      background-color: rgba(2, 132, 199, 0.66);
                      color: white;
                    ">
                    <div class="px-4 py-5 flex-auto">
                      <a href="/v2/testingLanguage">
                        <i class="fas fa-sitemap" />
                        Use our Image Library to teach Word-Image Connections.
                      </a>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col mt-4 shadow-lg p-6 bg-white rounded-lg" style="
                      background-color: rgba(2, 132, 199, 0.55);
                      color: white;
                    ">
                    <div class="px-4 py-5 flex-auto">
                      <a href="/v2/learningLanguage">
                        <i class="fas fa-sitemap" />
                        Use Images of your Surroundings to teach Words and Alphabet.
                      </a>
                    </div>
                  </div>
                  <div class="relative flex flex-col mt-4 shadow-lg p-6 bg-white rounded-lg" style="
                      background-color: rgba(2, 132, 199, 0.66);
                      color: white;
                    ">
                    <div class="px-4 py-5 flex-auto">
                      <a href="/v2/testingLanguage">
                        <i class="fas fa-sitemap" />
                        Use Images of your Surroundings to teach Word-Image Connections.
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mt-8 sm:hidden"></div>
      </div>


    </section>
  </div>
</template>
<script>
import ParentNavbar from "@/v2/components/ParentNavbar.vue";
import homePageImage from "@/v2/assets/images/girl-books.svg";

export default {
  data() {
    return {
      homePageImage,
    };
  },
  methods: {
    handleGetStarted() {
      // Get the target element
      const targetElement = this.$refs.tutorialsSection;

      // Scroll to the target element
      targetElement.scrollIntoView({ behavior: "smooth" });
    },
  },
  components: {
    ParentNavbar,
    // FooterComponent,
  },
};
</script>