<template>
  <div class="about-fknms flex flex-wrap justify-center">
    <section class="w-5/6">
        <h1 class="border-blue-lighter border-b-4 mb-4">Regulations and Zones</h1>   
        <p class="pt-4 italic">Florida Keys National Marine Sanctuary visitors are invited to dive, swim, snorkel, or fish; however, rules and regulations are in place to make sure that these activities only happen in ways – and at places – that are not harmful to sanctuary resources.</p>

        <BSImage imageSource="intro.jpg" />

        <p class="w-5/6 pt-4">Florida Keys National Marine Sanctuary uses a strategy called “marine zoning” to protect special habitat types such as corals, to avoid conflict by user groups such as divers and anglers, and to balance commercial and recreational interests with the need for a sustainable ecosystem.</p>
        <p class="w-5/6 pt-4">Some rules within the sanctuary apply throughout its waters while others apply only to specific zones. In this section, you will learn about sanctuary-wide regulations, zone-specific regulations, other regulations, and sanctuary mooring buoys.</p>

        <h2 class="w-5/6 pt-4">Sanctuary-wide Regulations</h2>
        <p class="w-5/6 pt-4">To protect resources within the sanctuary, there are several regulations that apply for the sanctuary as a whole.</p>
        
        <BSImage imageSource="0_title.jpg" />
        <BSImageWithBigCaption imageSource="1_coral.jpg" captionSize="small" caption="Removing, injuring, or possessing coral or live rock." />
        <BSImageWithBigCaption imageSource="2_discharge.jpg" captionSize="small" caption="Discharging or depositing trash or other pollutants." />
        <BSImageWithBigCaption imageSource="3_seabed.jpg" captionSize="small" caption="Operating a vessel so it strikes or injures coral, seagrass, or other organisms attached to the seabead." />
        <BSImageWithBigCaption imageSource="4_anchor.jpg" captionSize="small" caption="Anchoring on living coral." />
        <BSImageWithBigCaption imageSource="5_speed.jpg" captionSize="small" caption="Operating a vessel at more than four knots/no wake within 100 yards of residential shorelines, stationary vessels, dive flags, or navigational aids marking reefs." />
        <BSImageWithBigCaption imageSource="6_diveflag.jpg" captionSize="small" caption="Diving or snorkeling without a dive flag" />
        <BSImageWithBigCaption imageSource="7_exotic.jpg" captionSize="small" caption="Releasing exotic species." />
        <BSImageWithBigCaption imageSource="8_markers.jpg" captionSize="small" caption="Damaging or removing markers, mooring buoys, scientific equipment, boundary buoys, or trap buoys." />
        <BSImageWithBigCaption imageSource="9_historical.jpg" captionSize="small" caption="Moving, removing, injuring, or possessing historical resources." />
        <BSImageWithBigCaption imageSource="10_wildlife.jpg" captionSize="small" caption="Taking or possessing protected wildlife or any marine species not allowed by the Florida Fish and Wildlife Conservation Commission Rule." />


        <h2 class="w-5/6 pt-4">Zone Specific Regulations</h2>


        <div class="w-5/6 mx-auto pt-4">
          <img class="w-5/6 pt-4" src="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164239/fknms-bluestar/about-fknms/fknms-map.gif" />
        </div>

        <p class="w-5/6 pt-4">Within the boundaries of the sanctuary lie spectacular, unique, and nationally significant marine environments. The sanctuary protects the world’s third largest barrier reef, which is composed of more than 6,000 individual reefs. More than 2,000 square nautical miles of seagrass meadows blanket the seafloor of South Florida. Approximately 1,700 mangrove-fringed islands stretch for over 1,800 miles of shoreline within the sanctuary. More than 6,000 species of marine life – including more than 500 species of fish and 50 species of coral – call these habitats home. The sanctuary also protects pieces of our nation’s history such as shipwrecks and other archeological treasures.</p>
        
        <p class="w-5/6 pt-4 text-center font-semibold">As you have already learned, the sanctuary protects spectacular, unique, and nationally significant marine environments. As a Blue Star partner, you are playing an important role in protecting these valuable sanctuary resources. Through educating yourselves and your customers you can help ensure our sanctuary is healthy and vibrant for future generations of divers.</p>
      </section>
        
    <Quiz class="w-5/6 pt-4 mt-4 border-t-2 border-blue" :quiz="quiz" />
  </div>
</template>

<script>
// @ is an alias to /src
import Quiz from '@/components/quiz/Quiz.vue'

export default {
  name: "about-fknms",
  components: {
    Quiz,
  },
  data() {
    return {
      lessonName: "About FKNMS",
      lessonSlug: "about-fknms",
      programs: [
        'diving',
        'fishing',
      ],
      quiz: {
        title: "About FKNMS",
        description: "FKNMS is a large marine protected area.",
        passingScorePercent: 100,
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
