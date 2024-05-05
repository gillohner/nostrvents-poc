import React from 'react';
import { StyleSheet, Image, TextInput, SafeAreaView, Button } from 'react-native';
// Import the package, NIP-07 signer and NDK event
import NDK, { NDKEvent, NDKNip07Signer } from "@nostr-dev-kit/ndk";
import CreateCalendarEvent from './createCalendarEvent';

const nip07signer = new NDKNip07Signer();
const ndk = new NDK({
    signer: nip07signer
});

async function helloWorld(message) {
    await ndk.connect();
    nip07signer.user().then(async (user) => {
        if (!!user.npub) {
            console.log("Permission granted to read their public key:", user.npub);
        }
    });
    
    const ndkEvent = new NDKEvent(ndk);
    ndkEvent.kind = 1;
    ndkEvent.content = message;
    ndkEvent.publish(); // This will trigger the extension to ask the user to confirm signing.
}

export default function Nostr() {
    const [inputText, onChangeInputText] = React.useState('');    
    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeInputText}
                value={inputText}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
            <Button
                onPress={() => helloWorld(inputText)}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <CreateCalendarEvent/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "#fff",
        borderColor: "#f32443",
      },
});
