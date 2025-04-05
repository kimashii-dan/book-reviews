import Image from "next/image";
import { InfiniteSlider } from "./motion-primitives/infinite-slider";
export async function InfiniteSliderBasic() {
  return (
    <div className="flex items-center w-[800px] justify-center">
      <InfiniteSlider gap={24} reverse speed={70}>
        <Image
          src="https://books.google.com/books/content?id=09DljgEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70nyj81yHE3ooxZmRYVzO_ldTShaaTXjxNw_XTUhhnF764JvjnUN-6xrhlICHQXMyKvSxjczTpDkeGygVZYSP0K2sekXPQNUp3iqgvkVJUkk9IvgwPtjIj-WWvprzUIH8ELgmHa&source=gbs_api"
          alt="Apple Music logo"
          quality={75}
          width={150}
          height={250}
        />
        <Image
          src="https://books.google.com/books/content?id=CzJQngEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE7186xBFVTAOBAH5RgC1a7jlCRrhJUmWqFQY5lmC-Fnk7uQ5VlioC9HFsNlq__cJWE3dpsJKirblA9VBgOIKitro74zJNK844ynxI-sec_MLukaQixA8j_o2_E9HuZeLValeTmrc&source=gbs_api"
          alt="Chrome logo"
          quality={75}
          width={150}
          height={250}
        />
        <Image
          src="https://books.google.com/books/publisher/content?id=WPC1BAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71wBJ1Vh-AmpyBLq0WiCxohQBslU5raBoJMfjvYTCPd7Ljog0QYJcqkA5ZJSHTsd52n7mms5QS95G4zKv2x7dxn3ve7UuQuyKS04n22iefOv5qNQcsoelvfTCdduQhhEJrUSGM6&source=gbs_api"
          alt="Strava logo"
          quality={75}
          width={150}
          height={250}
        />
        <Image
          src="https://books.google.com/books/publisher/content?id=YQNbEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE721exXNg5heuuHwO5_6e8NE7v7kyW-3zbufBxeEXebOcE_C4u2N-rmWADnpt2IA3Myg1rkZqBVxAZWBy3vd2LPSRr19A1do5xfX6Ac2fxQ1G6J4jxhUQ1LCF6m_tIrtvW1foyfs&source=gbs_api"
          alt="Nintendo logo"
          quality={75}
          width={150}
          height={250}
        />
        <Image
          src="https://books.google.com/books/content?id=kBoR-5-ohoEC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72_k8EhUB4HkMB8GhRzuUKCHwou0VXUMVAvqPKMaNLIuegWp7JKsYY38TORfWbnPOAikY9IxPkp2aRWKAc5TDFWg-fnjo84gwulW-sJh-S3B9cchsFfMyy9Zsmr9HuL_EXIzyYY&source=gbs_api"
          alt="Jquery logo"
          quality={75}
          width={150}
          height={250}
        />
        <Image
          src="https://books.google.com/books/content?id=oesuzgEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE735i0gXnLlZuNrMvcVpvsFcz3_-PV6N9hpdar-14xoeoqW9iv7s5eluixb1su3q_Qc9_NSaxW6hCMdNkfyPuIEhb3DVlpjZ05EV1ZKKllvSY-6erPrbYiXhNVxXmO8xytnIGf8B&source=gbs_api"
          alt="Prada logo"
          quality={75}
          width={150}
          height={250}
        />
      </InfiniteSlider>
    </div>
  );
}
