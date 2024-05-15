import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles

// import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app
import App from "@/App.vue";

// V1 pages
import LandingPageV1 from "@/v1/views/LandingPage.vue";
import LearningLanguageV1 from "@/v1/views/LearningLanguage.vue";

// V2 pages
import LandingPageV2 from "@/v2/views/Index.vue";

// V2 - Testing Language pages
import TestingLanguageLanding from "@/v2/views/testing-language/TestingLanguageLanding.vue";
import TestingLanguageApp from "@/v2/views/testing-language/TestingLanguageApp.vue";
import TestingLanguageUpload from "@/v2/views/testing-language/TestingLanguageUpload.vue";

// V2 - Learning Language pages
import LearningLanguageLanding from "@/v2/views/learning-language/LearningLanguageLanding.vue";
import LearningLanguageApp from "@/v2/views/learning-language/LearningLanguageApp.vue";
import LearningLanguageUpload from "@/v2/views/learning-language/LearningLanguageUpload.vue";

// Landing Page
import LandingPage from "@/views/Index.vue";

// Teach Vocab pages
import TeachVocabApp from "@/views/teach-vocab/TeachVocabApp.vue";
import TeachVocabUpload from "@/views/teach-vocab/TeachVocabUpload.vue";
import TeachVocabError from "@/views/teach-vocab/TeachVocabError.vue";

// Teach Alphabets pages
import TeachAlphabetsApp from "@/views/teach-alphabets/TeachAlphabetsApp.vue";
import TeachAlphabetsUpload from "@/views/teach-alphabets/TeachAlphabetsUpload.vue";
import TeachAlphabetError from "@/views/teach-alphabets/TeachAlphabetError.vue";

// Teach Counting pages
import TeachCounting from "@/views/teach-counting/TeachCounting.vue";
import TeachCountingError from "@/views/teach-counting/TeachCountingError.vue";

// routes

const routes = [
  { path: "/:pathMatch(.*)*", redirect: "/" },
  { path: "/", name: "LandingPage", component: LandingPage },
  { path: "/v1", name: "LandingPageV1", component: LandingPageV1 },
  { path: "/v2", name: "LandingPageV2", component: LandingPageV2 },
  {
    path: "/v1/LearningLanguage",
    name: "LearningLanguageV1",
    component: LearningLanguageV1,
  },
  {
    path: "/v2/testingLanguage",
    name: "TestingLanguageLanding",
    component: TestingLanguageLanding,
  },
  {
    path: "/v2/testingLanguageApp",
    name: "TestingLanguageApp",
    component: TestingLanguageApp,
  },
  {
    path: "/v2/testingLanguageSelf",
    name: "TestingLanguageUpload",
    component: TestingLanguageUpload,
  },
  {
    path: "/v2/learningLanguage",
    name: "LearningLanguageLanding",
    component: LearningLanguageLanding,
  },
  {
    path: "/v2/learningLanguageApp",
    name: "LearningLanguageApp",
    component: LearningLanguageApp,
  },
  {
    path: "/v2/learningLanguageSelf",
    name: "LearningLanguageUpload",
    component: LearningLanguageUpload,
  },
  {
    path: "/teachVocabApp",
    name: "TeachVocabApp",
    component: TeachVocabApp,
  },
  {
    path: "/teachVocabUpload",
    name: "TeachVocabUpload",
    component: TeachVocabUpload,
  },
  {
    path: "/teachVocabError",
    name: "TeachVocabError",
    component: TeachVocabError,
  },
  {
    path: "/teachAlphabetsApp",
    name: "TeachAlphabetsApp",
    component: TeachAlphabetsApp,
  },
  {
    path: "/teachAlphabetsUpload",
    name: "TeachAlphabetsUpload",
    component: TeachAlphabetsUpload,
  },
  {
    path: "/teachAlphabetError",
    name: "TeachAlphabetError",
    component: TeachAlphabetError,
  },
  {
    path: "/teachCounting",
    name: "TeachCounting",
    component: TeachCounting,
  },
  {
    path: "/teachCountingError",
    name: "TeachCountingError",
    component: TeachCountingError,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
