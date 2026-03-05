# API Documentation

## Yamaha Receiver XML Protocol

The Yamaha RX-V577 uses an XML-based protocol for control over HTTP. This document describes the available commands and their structure.

## Base URL

```
http://<RECEIVER_IP>/YamahaRemoteControl/ctrl
```

All commands are sent as POST requests with XML content.

## Command Structure

### Basic XML Template

```xml
<YAMAHA_AV cmd="[GET|PUT]">
  <[Zone]>
    <[Command_Category]>
      <[Parameter]>[Value]</[Parameter]>
    </[Command_Category]>
  </[Zone]>
</YAMAHA_AV>
```

## Power Management

### Power On
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Power_Control>
      <Power>On</Power>
    </Power_Control>
  </Main_Zone>
</YAMAHA_AV>
```

### Power Off (Standby)
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Power_Control>
      <Power>Standby</Power>
    </Power_Control>
  </Main_Zone>
</YAMAHA_AV>
```

## Volume Control

### Set Volume Level
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Volume>
      <Lvl>
        <Val>-500</Val>
        <Exp>1</Exp>
        <Unit>dB</Unit>
      </Lvl>
    </Volume>
  </Main_Zone>
</YAMAHA_AV>
```
Note: Volume values are in 1/10 dB units (-800 = -80.0 dB, -200 = -20.0 dB)

### Mute Control
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Volume>
      <Mute>On</Mute>
    </Volume>
  </Main_Zone>
</YAMAHA_AV>
```
Values: On/Off

## Input Selection

### Select Input Source
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Input>
      <Input_Sel>HDMI1</Input_Sel>
    </Input>
  </Main_Zone>
</YAMAHA_AV>
```

Available inputs:
- HDMI1, HDMI2, HDMI3, HDMI4
- AV1, AV2, AV3, AV4
- AUDIO1, AUDIO2
- AirPlay
- SERVER
- NET_RADIO
- USB
- TUNER

## DSP Programs

### Set DSP Program
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Surround>
      <Program_Sel>
        <Current>
          <Sound_Program>Hall_in_Munich</Sound_Program>
        </Current>
      </Program_Sel>
    </Surround>
  </Main_Zone>
</YAMAHA_AV>
```

Available programs:
- Straight
- Surround_Decoder
- 2ch_Stereo
- 7ch_Stereo
- Hall_in_Munich
- Hall_in_Vienna
- Chamber
- Cellar_Club
- The_Roxy_Theatre
- The_Bottom_Line
- Sports
- Action_Game
- Roleplaying_Game
- Music_Video
- Standard
- Spectacle
- Sci-Fi
- Adventure
- Drama
- Mono_Movie

## Equalizer

### Set Equalizer Band
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Sound_Video>
      <Equalizer>
        <Low>
          <Val>30</Val>
          <Exp>1</Exp>
          <Unit>dB</Unit>
        </Low>
      </Equalizer>
    </Sound_Video>
  </Main_Zone>
</YAMAHA_AV>
```

Available bands:
- Low (63 Hz)
- Low_Mid_1 (160 Hz)
- Low_Mid_2 (400 Hz)
- Mid (1 kHz)
- Mid_Hi_1 (2.5 kHz)
- Mid_Hi_2 (6.3 kHz)
- High (16 kHz)

Values: -60 to +60 (representing -6.0 to +6.0 dB)

## Bass/Treble Control

### Set Bass Level
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Sound_Video>
      <Tone>
        <Bass>
          <Val>20</Val>
          <Exp>1</Exp>
          <Unit>dB</Unit>
        </Bass>
      </Tone>
    </Sound_Video>
  </Main_Zone>
</YAMAHA_AV>
```

### Set Treble Level
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Sound_Video>
      <Tone>
        <Treble>
          <Val>-10</Val>
          <Exp>1</Exp>
          <Unit>dB</Unit>
        </Treble>
      </Tone>
    </Sound_Video>
  </Main_Zone>
</YAMAHA_AV>
```

Values: -60 to +60 (representing -6.0 to +6.0 dB)

## Scene Control

### Activate Scene
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Scene>
      <Scene_Sel>Scene 1</Scene_Sel>
    </Scene>
  </Main_Zone>
</YAMAHA_AV>
```

Available scenes: Scene 1, Scene 2, Scene 3, Scene 4

## Status Queries

### Get Basic Status
```xml
<YAMAHA_AV cmd="GET">
  <Main_Zone>
    <Basic_Status>GetParam</Basic_Status>
  </Main_Zone>
</YAMAHA_AV>
```

Response includes:
- Power status
- Volume level
- Mute status
- Input selection
- Sound program
- Surround settings

### Get System Configuration
```xml
<YAMAHA_AV cmd="GET">
  <System>
    <Config>GetParam</Config>
  </System>
</YAMAHA_AV>
```

### Get Network Information
```xml
<YAMAHA_AV cmd="GET">
  <System>
    <Network_Standby>GetParam</Network_Standby>
  </System>
</YAMAHA_AV>
```

## Zone 2 Control

All Main_Zone commands can be applied to Zone_2 by replacing the zone tag:

```xml
<YAMAHA_AV cmd="PUT">
  <Zone_2>
    <Power_Control>
      <Power>On</Power>
    </Power_Control>
  </Zone_2>
</YAMAHA_AV>
```

## Audio Enhancement Features

### Extra Bass
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Sound_Video>
      <Extra_Bass>On</Extra_Bass>
    </Sound_Video>
  </Main_Zone>
</YAMAHA_AV>
```

### Pure Direct Mode
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Sound_Video>
      <Pure_Direct>
        <Mode>On</Mode>
      </Pure_Direct>
    </Sound_Video>
  </Main_Zone>
</YAMAHA_AV>
```

### Compressed Music Enhancer
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Sound_Video>
      <YPAO_Volume>On</YPAO_Volume>
    </Sound_Video>
  </Main_Zone>
</YAMAHA_AV>
```

## Sleep Timer

### Set Sleep Timer
```xml
<YAMAHA_AV cmd="PUT">
  <Main_Zone>
    <Power_Control>
      <Sleep>30 min</Sleep>
    </Power_Control>
  </Main_Zone>
</YAMAHA_AV>
```

Values: Off, 30 min, 60 min, 90 min, 120 min

## Error Responses

Errors are returned as XML:

```xml
<YAMAHA_AV rsp="NG" RC="3">
  <!-- Error details -->
</YAMAHA_AV>
```

Common response codes:
- RC="0": Success
- RC="1": Invalid parameter
- RC="2": Not available
- RC="3": Invalid request
- RC="4": Internal error
- RC="5": Busy

## Server Proxy Endpoints

The Node.js server provides the following proxy endpoints:

### Send Command to Receiver
```
POST /api/receiver/YamahaRemoteControl/ctrl
Content-Type: text/xml

<YAMAHA_AV cmd="GET">...</YAMAHA_AV>
```

### Get Receiver IP
```
GET /api/receiver-ip
```

Response:
```json
{
  "ip": "192.168.1.100"
}
```

### Set Receiver IP
```
POST /api/receiver-ip
Content-Type: application/json

{
  "ip": "192.168.1.100"
}
```

### Health Check
```
GET /api/health
```

Response:
```json
{
  "status": "ok"
}
```