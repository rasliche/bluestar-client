<template>
  <div class="about-fknms flex flex-wrap justify-center">
        <h1 class="border-blue-lighter border-b-4 mb-4 w-5/6">About Blue Star</h1>
        <p class="lg:w-5/6 pt-4 italic">Did you know that Florida Keys National Marine Sanctuary protects North America’s only living coral barrier reef? From beautiful reefs and lush kelp forests to deep-sea canyons and mysterious underwater shipwrecks, national marine sanctuaries located around the country protect some of our nation’s most unique riches.</p>
        <p class="lg:w-5/6 pt-4 italic">In this section, you will learn about the National Marine Sanctuary System, the history of Florida Keys National Marine Sanctuary, and about the areas and resources that the sanctuary protect.</p>

        <iframe class="pt-4" width="560" height="315" frameborder='0' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src='https://www.youtube.com/embed/F2QnOyEvOa0'></iframe>

        <p class="w-5/6 pt-4">First established in 1972, the National Marine Sanctuary System has grown to include 13 sanctuaries and one national monument. Managed by the National Oceanic and Atmospheric Administration (or “NOAA”), the mission of these marine protected areas cover more than 150,000 square miles of marine and Great Lakes waters from Washington State to the Gulf of Mexico, Lake Huron, and American Samoa. Ranging in size from less than one square mile to 137,792 square miles, each sanctuary site is a special place, managed to conserve, protect, and enhance biodiversity, ecological integrity and cultural legacy.</p>
        
        <div class="w-5/6">
          <img class="w-5/6 pt-4" src="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164243/fknms-bluestar/about-fknms/onms-map.jpg" />
        </div>

        <h2 class="w-5/6 pt-4">A Sanctuary in the Florida Keys</h2>
        <p class="w-5/6 pt-4">Warning signs of the fragility and finite nature of marine resources in the Florida Keys have been present for years. Concerns over pollution, overfishing, overuse, and misuse, and the subsequent demise of the area’s coral reefs, eventually led to the establishment of the Key Largo and Looe Key National Marine Sanctuaries.</p>
        <p class="w-5/6 pt-4">While these sanctuaries and other marine protected areas, such as John Pennekamp Coral Reef State Park, were steps in the right direction to protect reefs, things in the Keys continued to decline. In 1990, amidst concerns about deteriorating water quality, the threat of oil drilling, and numerous vessel groundings, Congress designated the Florida Keys National Marine Sanctuary, incorporating the preexisting Key Largo and Looe Key sanctuaries.</p>
        <p class="w-5/6 pt-4">Today, the sanctuary protects 2,900 square nautical miles of waters surrounding the Florida Keys, from south of Miami and extending westward to encompass the Dry Tortugas, but excluding the Dry Tortugas National Park. The shoreward boundary of the sanctuary is the mean high-water mark, meaning that once you set foot in Keys waters, you have entered the sanctuary.</p>

        <div class="w-5/6">
          <img class="w-5/6 pt-4" src="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164239/fknms-bluestar/about-fknms/fknms-map.gif" />
        </div>

        <p class="w-5/6 pt-4">Within the boundaries of the sanctuary lie spectacular, unique, and nationally significant marine environments. The sanctuary protects the world’s third largest barrier reef, which is composed of more than 6,000 individual reefs. More than 2,000 square nautical miles of seagrass meadows blanket the seafloor of South Florida. Approximately 1,700 mangrove-fringed islands stretch for over 1,800 miles of shoreline within the sanctuary. More than 6,000 species of marine life – including more than 500 species of fish and 50 species of coral – call these habitats home. The sanctuary also protects pieces of our nation’s history such as shipwrecks and other archeological treasures.</p>

        <div class="w-5/6 flex">
          <p class="w-1/3 text-right">Vast mangrove forests.</p>
          <div class="w-2/3">
            <img src="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164243/fknms-bluestar/about-fknms/mangroves.jpg" />
          </div>
        </div>

        <div class="w-5/6 pt-4">
          <img src="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164244/fknms-bluestar/about-fknms/apal-coral.jpg" />
        </div>
        <div class="w-5/6 pt-4">
          <img src="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164240/fknms-bluestar/about-fknms/shipwreck.jpg" />
        </div>
        <div class="w-5/6 pt-4">
          <img width="2592" src="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164249/fknms-bluestar/about-fknms/seagrass.jpg" />
        </div>
        <div class="w-5/6 pt-4">
          <img src="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164246/fknms-bluestar/about-fknms/aerial-reef.jpg" />
        </div>

        <p class="w-5/6 pt-4">As a Blue Star partner, you are playing an important role in protecting these unique and valuable sanctuary resources.</p>
        
        <Quiz class="w-5/6 pt-4 mt-4 border-t-2 border-blue" :quiz="quiz" />
  </div>
</template>

<script>
// @ is an alias to /src
import Quiz from '@/components/quiz/Quiz.vue'

export default {
  name: "about-fknms",
  components: {
    Quiz
  },
  data() {
    return {
      quiz: {
        title: "About FKNMS",
        description: "FKNMS is a large marine protected area.",
        passingScorePercent: 1,
        questions: [
          {
            text: "The Florida Keys National Marine Sanctuary is part of a _________ system of marine protected areas, managed by the _________.",
            answers: [
              { text: 'statewide, Florida Fish and Wildlife Conservation Commission', isRight: false },
              { text: 'regional, National Park Service', isRight: false },
              { text: 'national, National Park Service', isRight: false },
              { text: 'regional, National Oceanic and Atmospheric Administration', isRight: false },
              { text: 'national, National Oceanic and Atmospheric Administration', isRight: true }
            ],
            theMoreYouKnow: 'The Florida Keys National Marine Sanctuary is one of 13 sanctuaries located across the nation and managed by the National Oceanic and Atmospheric Administration, or NOAA. NOAA is a federal agency housed under the U.S. Department of Commerce. NOAA programs and services assist citizens across the entire nation.'
          },
          {
            text: "The Florida Keys National Marine Sanctuary was designated in: ",
            answers: [
              { text: '1985', isRight: false },
              { text: '1990', isRight: true },
              { text: '2001', isRight: false },
              { text: '1970', isRight: false },
              { text: '1995', isRight: false }
            ],
            theMoreYouKnow: 'Congress designated the Florida Keys National Marine Sanctuary in 1990, amidst concerns over declining water quality, oil exploration threats, and vessel groundings.'
          }
        ]
      }
    }
  }
}
</script>
