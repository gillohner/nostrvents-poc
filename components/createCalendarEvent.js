import React from 'react';
import { StyleSheet, TextInput, SafeAreaView, Button } from 'react-native';
import NDK, { NDKEvent, NDKNip07Signer } from "@nostr-dev-kit/ndk";

const nip07signer = new NDKNip07Signer();
const ndk = new NDK({
    signer: nip07signer,
    explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net", "wss://nos.lol"],
});

async function createCalendarEvent (eventName) {
    await ndk.connect();
    nip07signer.user().then(async (user) => {
        if (!!user.npub) {
            console.log("Permission granted to read their public key:", user.npub);
        }
    });
    
    const ndkEvent = new NDKEvent(ndk);
    ndkEvent.kind = 31923;
    ndkEvent.content = eventName;
    ndkEvent.tags = [
        ["d", "<UUID>"],

        ["title", "<title of calendar event>"],
    
        // Timestamps
        ["start", "<Unix timestamp in seconds>"],
        ["end", "<Unix timestamp in seconds>"],
    
        ["start_tzid", "<IANA Time Zone Database identifier>"],
        ["end_tzid", "<IANA Time Zone Database identifier>"],
    
        // Location
        ["location", "<location>"],
        ["g", "<geohash>"],
    
        // Participants
        ["p", "<32-bytes hex of a pubkey>", "<optional recommended relay URL>", "<role>"],
        ["p", "<32-bytes hex of a pubkey>", "<optional recommended relay URL>", "<role>"],
    
        // Hashtags
        ["t", "<tag>"],
        ["t", "<tag>"],
    
        // Reference links
        ["r", "<url>"],
        ["r", "<url>"]
    ];
    ndkEvent.publish(); // This will trigger the extension to ask the user to confirm signing.
    console.log(ndkEvent.id);
}

export default function CreateCalendarEvent() {
    const [eventName, onChangeEventName] = React.useState('');    
    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEventName}
                value={eventName}
                placeholder="Very cool event name!"
                keyboardType="numeric"
            />
            <Button
                onPress={() => createCalendarEvent(eventName)}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "#fff",
        borderColor: "#f32443",
      },
});