import { ImageIcon } from "lucide-react";
import Image from "next/image";

/**
 * One fixed box for every row, whether or not there is an image to put in it.
 *
 * The frame's size never varies: the image is stretched to fill it and cropped
 * from the centre (`object-cover`), so tall, wide, or oddly-sized files all land
 * the same. A row with no image keeps the same box, so titles stay aligned down
 * the whole list instead of jumping left.
 */
export function Thumbnail({ src, alt = "" }: { src?: string; alt?: string }) {
  return (
    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-rule bg-surface sm:w-[280px] lg:w-[320px]">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover"
        />
      ) : (
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <ImageIcon className="size-5 text-muted-foreground/35" />
        </span>
      )}
    </div>
  );
}
