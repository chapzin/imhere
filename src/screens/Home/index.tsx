import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../components/Participant';

export function Home() {
    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState('')

    function handleParticipantAdd() {
        if (participants.includes(participantName.trim())) {
            return Alert.alert('Participante já adicionado')
        }

        if (participantName.trim() === '') {
            return Alert.alert('Digite o nome do participante')
        }

        setParticipants([...participants, participantName.trim()])
        setParticipantName('')

    }

    function handleParticipantRemove(name: string) {
        Alert.alert('Remover participante', `Deseja remover ${name}?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => participants.filter(participant => participant !== name))
            }
        ])
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Nome do evento
            </Text>
            <Text style={styles.subtitle}>
                Quarta, 4 de Janeiro de 2023.
            </Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor={"#B2B9FF"}
                    allowFontScaling={true}
                    onChangeText={setParticipantName}
                    value={participantName}
                />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}> + </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={participants}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Participant name={item} key={item} onRemove={() => handleParticipantRemove(item)} />
                )}
            />

        </View>
    )
}