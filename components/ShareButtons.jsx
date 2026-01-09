"use client";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LineShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LineIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  const publicDomain =
    process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
  const shareUrl = `${publicDomain}/properties/${property._id}`;

  const typeHashtag = `#${property.type.replace(/\s/g, "")}ForRent`;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>

      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={typeHashtag}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[typeHashtag.replace("#", "")]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <LineShareButton url={shareUrl} title={property.name}>
          <LineIcon size={40} round={true} />
        </LineShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body="Check out this property listing:"
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
