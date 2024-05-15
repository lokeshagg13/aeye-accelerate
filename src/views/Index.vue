<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <index-navbar />
    <section class="header bg-child py-16 items-center flex max-h-960-px">
      <div class="w-full mx-auto items-center flex flex-wrap pt-16 lg:mt-0">
        <div class="w-full px-4 pb-10">
          <h2 class="font-bold text-bxl text-blueGray-600">
            Teach your child to read &amp; count using pictures
          </h2>
        </div>
        <div class="w-full flex flex-wrap justify-center items-center">
          <div class="md:w-10/12 lg:w-6/12 xl:w-6/12 px-4">
            <div class="pt-8 pb-8 sm:pt-0">
              <div class="flex flex-wrap justify-between mt-8">
                <div class="w-full md:w-6/12 px-4">
                  <router-link to="/teachVocabApp" class="btn btn-primary">
                    <div
                      class="landing-btn relative flex flex-col min-w-0 shadow-lg p-6 bg-white rounded-lg h-full"
                    >
                      <div
                        class="px-4 py-5 flex flex-col items-center justify-center"
                      >
                        <i class="fas fa-sitemap"></i>
                        <div class="text-3xl font-bold">Teach Vocabulary</div>
                        <div class="flex flex-wrap mt-2">
                          <div class="text-xl border-r pr-4">For ages</div>
                          <div class="text-2xl pl-4">1-3 Years</div>
                        </div>
                        <div class="mt-4">
                          <img
                            src="@/assets/images/landing-img-obj-image.svg"
                            width="250"
                            class="mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="w-full md:w-6/12 px-4">
                  <router-link to="/teachVocabUpload" class="btn btn-primary">
                    <div
                      class="landing-btn relative flex flex-col min-w-0 shadow-lg p-6 bg-white rounded-lg h-full xs:mt-4 sm:mt-4 md:mt-0"
                    >
                      <div
                        class="px-4 py-5 flex flex-col items-center justify-center"
                      >
                        <i class="fas fa-sitemap"></i>
                        <div class="text-3xl font-bold">
                          Teach Vocabulary with your Pictures
                        </div>
                        <div class="flex flex-wrap mt-2">
                          <div class="text-xl border-r pr-4">For ages</div>
                          <div class="text-2xl pl-4">1-3 Years</div>
                        </div>
                        <div class="mt-4">
                          <img
                            src="@/assets/images/landing-cam-obj-image.svg"
                            width="250"
                            class="mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="flex justify-center">
                <div class="w-full md:w-6/12 px-4">
                  <router-link to="/teachCounting" class="btn btn-primary">
                    <div
                      class="landing-btn relative flex flex-col min-w-0 shadow-lg p-6 bg-white rounded-lg h-full xs:mt-8 sm:mt-8 md:mt-4"
                    >
                      <div
                        class="px-4 py-5 flex flex-col items-center justify-center"
                      >
                        <i class="fas fa-sitemap"></i>
                        <div class="text-3xl font-bold">Teach Counting</div>
                        <div class="flex flex-wrap mt-2">
                          <div class="text-xl border-r pr-4">For ages</div>
                          <div class="text-2xl pl-4">2+ Years</div>
                        </div>
                        <div class="mt-4">
                          <img
                            src="@/assets/images/landing-123-image.svg"
                            width="250"
                          />
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="flex flex-wrap justify-between mt-8">
                <div class="w-full md:w-6/12 px-4">
                  <router-link to="/teachAlphabetsApp" class="btn btn-primary">
                    <div
                      class="landing-btn relative flex flex-col min-w-0 shadow-lg p-6 bg-white rounded-lg h-full xs:mt-4 sm:mt-4 md:mt-0"
                    >
                      <div
                        class="px-4 py-5 flex flex-col items-center justify-center"
                      >
                        <i class="fas fa-sitemap"></i>
                        <div class="text-3xl font-bold">Teach Alphabet</div>
                        <div class="mt-auto">
                          <div class="flex flex-wrap mt-2">
                            <div class="text-xl border-r pr-4">For ages</div>
                            <div class="text-2xl pl-4">3+ Years</div>
                          </div>
                          <div class="mt-4">
                            <img
                              src="@/assets/images/landing-img-abc-image.svg"
                              width="250"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="w-full md:w-6/12 px-4">
                  <router-link to="/teachAlphabetsUpload" class="btn btn-primary">
                    <div
                      class="landing-btn relative flex flex-col min-w-0 shadow-lg p-6 bg-white rounded-lg h-full xs:mt-8 sm:mt-8 md:mt-0"
                    >
                      <div
                        class="px-4 py-5 flex flex-col items-center justify-center"
                      >
                        <i class="fas fa-sitemap"></i>
                        <div class="text-3xl font-bold">
                          Teach Alphabet with your Pictures
                        </div>
                        <div class="mt-auto">
                          <div class="flex flex-wrap mt-2">
                            <div class="text-xl border-r pr-4">For ages</div>
                            <div class="text-2xl pl-4">3+ Years</div>
                          </div>
                          <div class="mt-4">
                            <img
                              src="@/assets/images/landing-cam-abc-image.svg"
                              width="250"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mt-8 sm:hidden"></div>
      </div>
    </section>
    <footer-component />
  </div>
</template>
<script>
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";

export default {
  components: {
    IndexNavbar,
    FooterComponent,
  },
};
</script>
