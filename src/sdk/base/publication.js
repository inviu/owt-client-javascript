// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0

'use strict';

import * as Utils from './utils.js';
import * as MediaFormat from './mediaformat.js';
import {EventDispatcher} from '../base/event.js';

/**
 * @class AudioPublicationSettings
 * @memberOf Owt.Base
 * @classDesc The audio settings of a publication.
 * @hideconstructor
 */
export class AudioPublicationSettings {
  // eslint-disable-next-line require-jsdoc
  constructor(codec) {
    /**
     * @member {?Owt.Base.AudioCodecParameters} codec
     * @instance
     * @memberof Owt.Base.AudioPublicationSettings
     */
    this.codec = codec;
  }
}

/**
 * @class VideoPublicationSettings
 * @memberOf Owt.Base
 * @classDesc The video settings of a publication.
 * @hideconstructor
 */
export class VideoPublicationSettings {
  // eslint-disable-next-line require-jsdoc
  constructor(codec, resolution, frameRate, bitrate, keyFrameInterval) {
    /**
     * @member {?Owt.Base.VideoCodecParameters} codec
     * @instance
     * @memberof Owt.Base.VideoPublicationSettings
     */
    this.codec=codec,
    /**
     * @member {?Owt.Base.Resolution} resolution
     * @instance
     * @memberof Owt.Base.VideoPublicationSettings
     */
    this.resolution=resolution;
    /**
     * @member {?number} frameRates
     * @instance
     * @classDesc Frames per second.
     * @memberof Owt.Base.VideoPublicationSettings
     */
    this.frameRate=frameRate;
    /**
     * @member {?number} bitrate
     * @instance
     * @memberof Owt.Base.VideoPublicationSettings
     */
    this.bitrate=bitrate;
    /**
     * @member {?number} keyFrameIntervals
     * @instance
     * @classDesc The time interval between key frames. Unit: second.
     * @memberof Owt.Base.VideoPublicationSettings
     */
    this.keyFrameInterval=keyFrameInterval;
  }
}

/**
 * @class PublicationSettings
 * @memberOf Owt.Base
 * @classDesc The settings of a publication.
 * @hideconstructor
 */
export class PublicationSettings {
  // eslint-disable-next-line require-jsdoc
  constructor(audio, video) {
    /**
     * @member {Owt.Base.AudioPublicationSettings} audio
     * @instance
     * @memberof Owt.Base.PublicationSettings
     */
    this.audio=audio;
    /**
     * @member {Owt.Base.VideoPublicationSettings} video
     * @instance
     * @memberof Owt.Base.PublicationSettings
     */
    this.video=video;
  }
}

/**
 * @class Publication
 * @extends Owt.Base.EventDispatcher
 * @memberOf Owt.Base
 * @classDesc Publication represents a sender for publishing a stream. It
 * handles the actions on a LocalStream published to a conference.
 * Events:
 *
 * | Event Name      | Argument Type    | Fired when       |
 * | ----------------| ---------------- | ---------------- |
 * | ended           | Event            | Publication is ended. |
 * | mute            | MuteEvent        | Publication is muted. Client stopped sending audio and/or video data to remote endpoint. |
 * | unmute          | MuteEvent        | Publication is unmuted. Client continued sending audio and/or video data to remote endpoint. |
 *
 * @hideconstructor
 */
export class Publication extends EventDispatcher {
  // eslint-disable-next-line require-jsdoc
  constructor(id, stop, getStats, mute, unmute) {
    super();
    /**
     * @member {string} id
     * @instance
     * @memberof Owt.Base.Publication
     */
    Object.defineProperty(this, 'id', {
      configurable: false,
      writable: false,
      value: id ? id : Utils.createUuid(),
    });
    /**
     * @function stop
     * @instance
     * @desc Stop certain publication. Once a subscription is stopped, it cannot be recovered.
     * @memberof Owt.Base.Publication
     * @returns {undefined}
     */
    this.stop = stop;
    /**
     * @function getStats
     * @instance
     * @desc Get stats of underlying PeerConnection.
     * @memberof Owt.Base.Publication
     * @returns {Promise<RTCStatsReport, Error>}
     */
    this.getStats = getStats;
    /**
     * @function mute
     * @instance
     * @desc Stop sending data to remote endpoint.
     * @memberof Owt.Base.Publication
     * @param {Owt.Base.TrackKind } kind Kind of tracks to be muted.
     * @returns {Promise<undefined, Error>}
     */
    this.mute = mute;
    /**
     * @function unmute
     * @instance
     * @desc Continue sending data to remote endpoint.
     * @memberof Owt.Base.Publication
     * @param {Owt.Base.TrackKind } kind Kind of tracks to be unmuted.
     * @returns {Promise<undefined, Error>}
     */
    this.unmute = unmute;
  }
}

/**
 * @class PublishOptions
 * @memberOf Owt.Base
 * @classDesc PublishOptions defines options for publishing a Owt.Base.LocalStream.
 */
export class PublishOptions {
  // eslint-disable-next-line require-jsdoc
  constructor(audio, video) {
    /**
     * @member {?Array<Owt.Base.AudioEncodingParameters>} audio
     * @instance
     * @memberof Owt.Base.PublishOptions
     */
    this.audio = audio;
    /**
     * @member {?Array<Owt.Base.VideoEncodingParameters>} video
     * @instance
     * @memberof Owt.Base.PublishOptions
     */
    this.video = video;
  }
}
