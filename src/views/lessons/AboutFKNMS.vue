<template>
  <div class="about-fknms flex flex-wrap justify-center">
        <h1 class="border-blue-lighter border-b-4 mb-4 w-5/6">About Florida Keys National Marine Sanctuary</h1>
       
        <p class="w-5/6 italic">Did you know that Florida Keys National Marine Sanctuary protects North America’s only living coral barrier reef? From beautiful reefs and lush kelp forests to deep-sea canyons and mysterious underwater shipwrecks, national marine sanctuaries located around the country protect some of our nation’s most unique riches.</p>
        <p class="w-5/6 pt-2 italic">In this section, you will learn about the National Marine Sanctuary System, the history of Florida Keys National Marine Sanctuary, and about the areas and resources that the sanctuary protect.</p>

        <iframe class="pt-2" width="560" height="315" frameborder='0' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src='https://www.youtube.com/embed/F2QnOyEvOa0'></iframe>

        <p class="w-5/6 pt-2">First established in 1972, the National Marine Sanctuary System has grown to include 13 sanctuaries and one national monument. Managed by the National Oceanic and Atmospheric Administration (or “NOAA”), the mission of these marine protected areas cover more than 150,000 square miles of marine and Great Lakes waters from Washington State to the Gulf of Mexico, Lake Huron, and American Samoa. Ranging in size from less than one square mile to 137,792 square miles, each sanctuary site is a special place, managed to conserve, protect, and enhance biodiversity, ecological integrity and cultural legacy.</p>
        
        <!-- [insert: nmsmap2.jpg] -->

        <h2 class="w-5/6 pt-2">A Sanctuary in the Florida Keys</h2>
        <p class="w-5/6 pt-2">Warning signs of the fragility and finite nature of marine resources in the Florida Keys have been present for years. Concerns over pollution, overfishing, overuse, and misuse, and the subsequent demise of the area’s coral reefs, eventually led to the establishment of the Key Largo and Looe Key National Marine Sanctuaries.</p>
        <p class="w-5/6 pt-2">While these sanctuaries and other marine protected areas, such as John Pennekamp Coral Reef State Park, were steps in the right direction to protect reefs, things in the Keys continued to decline. In 1990, amidst concerns about deteriorating water quality, the threat of oil drilling, and numerous vessel groundings, Congress designated the Florida Keys National Marine Sanctuary, incorporating the preexisting Key Largo and Looe Key sanctuaries.</p>
        <p class="w-5/6 pt-2">Today, the sanctuary protects 2,900 square nautical miles of waters surrounding the Florida Keys, from south of Miami and extending westward to encompass the Dry Tortugas, but excluding the Dry Tortugas National Park. The shoreward boundary of the sanctuary is the mean high-water mark, meaning that once you set foot in Keys waters, you have entered the sanctuary.</p>

        <!-- [insert: fknms_map.gif] -->

        <p class="w-5/6 pt-2">Within the boundaries of the sanctuary lie spectacular, unique, and nationally significant marine environments. The sanctuary protects the world’s third largest barrier reef, which is composed of more than 6,000 individual reefs. More than 2,000 square nautical miles of seagrass meadows blanket the seafloor of South Florida. Approximately 1,700 mangrove-fringed islands stretch for over 1,800 miles of shoreline within the sanctuary. More than 6,000 species of marine life – including more than 500 species of fish and 50 species of coral – call these habitats home. The sanctuary also protects pieces of our nation’s history such as shipwrecks and other archeological treasures.</p>

        <!-- [insert: slideshow of images: FK_aerial reef.jpg; FK_mangrove.jpg; FK_A.palm_coral.jpg; fish_coral.jpg; shipwreck.jpg; seagrass2.jpg (something like fknmshabs.mov)] -->

        <p class="w-5/6 pt-2">As a Blue Star partner, you are playing an important role in protecting these unique and valuable sanctuary resources.</p>
        <div class="w-5/6 pt-2">
            <Quiz />
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Quiz from '@/components/Quiz.vue'

export default {
  name: "about-fknms",
  components: {
    Quiz,
  }
}
</script>
