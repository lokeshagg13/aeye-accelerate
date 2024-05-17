<template>
  <nav
    class="w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link to="/">
          <a
            class="text-blueGray-700 text-lg flex flex-wrap items-center justify-between font-bold leading-relaxed mr-4 py-2 whitespace-nowrap uppercase"
          >
            <img
              src="@/assets/images/project-logo.svg"
              width="40"
              height="40"
            />
            <h1 class="text-3xl ml-3">A.EYE</h1>
          </a>
        </router-link>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar"
        >
          <img src="@/assets/icons/menu-icon.svg" width="20" />
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center"
        :class="[navbarOpen ? 'block' : 'hidden']"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center lg:mx-8">
            <router-link to="/">
              <a
                class="hover:text-blueGray-500 text-blueGray-700 py-2 flex items-center text-2xl font-bold"
                :class="getActiveClass('/')"
              >
                Home
              </a>
            </router-link>
          </li>
          <li class="flex items-center relative lg:mx-4">
            <a
              class="hover:text-blueGray-500 text-blueGray-700 py-2 flex items-center text-2xl font-bold"
              :class="getActiveClass('/teachVocab')"
              href="#"
              ref="teachVocabRef"
              @click="toggleTeachVocabDropdown($event)"
            >
              Teach Vocabulary
            </a>
            <div
              ref="teachVocabDropdownRef"
              class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
              v-bind:class="{
                hidden: !showTeachVocabDropdown,
                block: showTeachVocabDropdown,
              }"
            >
              <router-link
                to="/teachVocabApp"
                class="text-xl py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >
                Using our Images
              </router-link>
              <router-link
                to="/teachVocabUpload"
                class="text-xl py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >
                Using your Images
              </router-link>
            </div>
          </li>
          <li class="flex items-center lg:mx-4">
            <router-link to="/teachCounting">
              <a
                class="hover:text-blueGray-500 text-blueGray-700 py-2 flex items-center text-2xl font-bold"
                :class="getActiveClass('/teachCounting')"
              >
                Teach Counting
              </a></router-link
            >
          </li>
          <li class="flex items-center relative lg:mx-4">
            <a
              class="hover:text-blueGray-500 text-blueGray-700 py-2 flex items-center text-2xl font-bold"
              :class="getActiveClass('/teachAlphabet')"
              href="#"
              ref="teachLettersRef"
              @click="toggleTeachLettersDropdown($event)"
            >
              Teach Alphabet
            </a>
            <div
              ref="teachLettersDropdownRef"
              class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
              v-bind:class="{
                hidden: !showTeachLettersDropdown,
                block: showTeachLettersDropdown,
              }"
            >
              <router-link
                to="/teachAlphabetsApp"
                class="text-xl py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >
                Using our Images
              </router-link>
              <router-link
                to="/teachAlphabetsUpload"
                class="text-xl py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >
                Using your Images
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { createPopper } from "@popperjs/core";

export default {
  data() {
    return {
      navbarOpen: false,
      showTeachVocabDropdown: false,
      showTeachLettersDropdown: false,
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    toggleTeachVocabDropdown(event) {
      event.preventDefault();
      if (this.showTeachVocabDropdown) {
        this.showTeachVocabDropdown = false;
      } else {
        this.showTeachVocabDropdown = true;
        this.showTeachLettersDropdown = false;
        createPopper(
          this.$refs.teachVocabRef,
          this.$refs.teachVocabDropdownRef,
          {
            placement: "bottom-start",
          }
        );
        setTimeout(() => (this.showTeachVocabDropdown = false), 5000);
      }
    },
    toggleTeachLettersDropdown(event) {
      event.preventDefault();
      if (this.showTeachLettersDropdown) {
        this.showTeachLettersDropdown = false;
      } else {
        this.showTeachLettersDropdown = true;
        this.showTeachVocabDropdown = false;
        createPopper(
          this.$refs.teachLettersRef,
          this.$refs.teachLettersDropdownRef,
          {
            placement: "bottom-start",
          }
        );
        setTimeout(() => (this.showTeachLettersDropdown = false), 5000);
      }
    },
    getActiveClass(route) {
      if (route == "/") {
        if (this.$route.path === "/") {
          return "menu-item-active";
        } else {
          return "";
        }
      }

      if (this.$route.path.includes(route)) {
        return "menu-item-active";
      } else {
        return "";
      }
    },
  },
  components: {},
};
</script>
