"use strict";

const CHUNKS = {
    mobile: {
    css: "mobile",
    js: "mobile"
  },
  desktop: {
    css: "desktop",
    js: "desktop"
  }
};

const getDeviceType = (header) => {
	if(header['user-agent'].match(/mobile/i)) {
		return 'mobile';
	} else if (header['user-agent'].match(/iPad|Android|Touch/i)) {
		return 'mobile';
	} else {
		return 'desktop';
	}
}

const getChunks = header => {
//   if (path.endsWith("/about")) {
//     return CHUNKS.desktop;
//   }
    console.log(header['user-agent']);
  return CHUNKS[getDeviceType(header)];
};

module.exports = request => {
    return getChunks(request.headers);
};