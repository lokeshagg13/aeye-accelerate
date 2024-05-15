<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- <index-navbar /> -->
    <parent-navbar />
    <section class="header relative items-center flex h-screen max-h-860-px">
      <div class="container mx-auto items-center justify-center flex flex-wrap">
        <div class="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div class="pt-32 sm:pt-0">
            <h2 class="font-semibold text-4xl text-blueGray-600">
              Teach your child about words and alphabets in their environment
            </h2>
            <div class="flex flex-wrap">
              <div
                class="hover:-mt-4 ease-linear transition-all duration-150 pt-6 w-full md:w-6/12 px-4 text-center"
              >
                <div
                  class="relative flex flex-col items-center min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
                >
                  <router-link to="/v2/learningLanguageApp">
                    <img
                      alt="..."
                      src="@/v2/assets/images/kangaroo-mc.jpg"
                      width="200vw"
                      height="300vh"
                    />
                    <div class="px-4 py-5 flex-auto">
                      <h6 class="text-xl font-semibold">
                        Learn English<br />with fun<br />images
                      </h6>
                    </div></router-link
                  >
                </div>
              </div>

              <div
                class="hover:-mt-4 ease-linear transition-all duration-150 pt-6 w-full md:w-6/12 px-4 text-center"
              >
                <div
                  class="relative flex flex-col items-center min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
                >
                  <router-link to="/v2/learningLanguageSelf">
                    <img
                      alt="..."
                      src="@/v2/assets/images/lion-mc.jpg"
                      class=""
                      width="200vw"
                      height="300vh"
                    />

                    <div class="px-4 py-5 mt-5 flex-auto">
                      <h6 class="text-xl font-semibold">
                        Learn English<br />with your<br />images
                      </h6>
                    </div>
                  </router-link>
                </div>
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
    return {};
  },
  components: {
    ParentNavbar,
  },
};
</script>
