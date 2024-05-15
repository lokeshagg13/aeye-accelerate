<template>
  <div>
    <index-navbar />
    <section class="header py-16 flex flex-col items-center">
      <div class="flex flex-col items-center justify-center mb-8 px-4">
        <div
          class="mt-4 md:px-4 flex justify-center"
        >
          <img
            alt="Lion Confused"
            src="@/assets/images/lion-mascot-questioning.png"
            class="align-middle rounded-t-lg iw-20 md:imw-20 sm:imw-25 xs:imw-30"
          />
        </div>
        <div class="ml-8">
          <h1 class="text-4xl font-bold text-red-500">Sorry...</h1>
          <p class="text-xl mt-4">It's not you. It's us.</p>
          <p class="text-gray-500 mt-4">
            We're experiencing an internal server problem while loading the
            picture(s). Please try again later.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";

export default {
  components: { IndexNavbar },
};
</script>
