import { FeatureCard } from "./feature-card";

import TagsImage from "@/public/tags_image.svg";
import ShareNotesImage from "@/public/share_notes_image.svg";
import AccessAnywhereImage from "@/public/access_anywhere_image.svg";

export default function Features () {
    return (
      <section className="w-full flex items-center justify-start gap-4">
        <FeatureCard
          featureImage={TagsImage}
          featureHeader="Tagging System"
          featureDescription="Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
        />
        <FeatureCard
          featureImage={ShareNotesImage}
          featureHeader="Share Notes Instantly"
          featureDescription="Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
        />
        <FeatureCard
          featureImage={AccessAnywhereImage}
          featureHeader="Access Anywhere"
          featureDescription="Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
        />
      </section>
    );
}