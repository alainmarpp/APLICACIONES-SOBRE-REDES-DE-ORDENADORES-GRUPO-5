
import React from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View,
} from "react-native";

import styles from "./RegistroPerroScreenStyles";
import { useRegistroPerroScreen } from "./useRegistroPerroScreen";

export default function RegistroPerroScreen() {
    const {
        nombre,
        setNombre,
        edad,
        setEdad,
        peso,
        setPeso,
        raza,
        setRaza,
        cargando,
        handleRegistro,
    } = useRegistroPerroScreen();

    return (
        <View style={styles.pantalla}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
            >
                <Text style={styles.title}>Nuevo Animal</Text>

                <Text style={styles.subtitle}>Cuéntanos</Text>

                <Text style={styles.label}>¿Cómo se llama? 🐾</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Coco, Mía, Bimba..."
                    placeholderTextColor="#B5A0AC"
                    value={nombre}
                    onChangeText={setNombre}
                    returnKeyType="next"
                />

                <Text style={styles.label}>Edad (años) 🎂</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. 2"
                    placeholderTextColor="#B5A0AC"
                    keyboardType="numeric"
                    value={edad}
                    onChangeText={setEdad}
                    returnKeyType="next"
                />

                <Text style={styles.label}>Peso (kg) ⚖️</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. 8.5"
                    placeholderTextColor="#B5A0AC"
                    keyboardType="decimal-pad"
                    value={peso}
                    onChangeText={setPeso}
                    returnKeyType="next"
                />

                <Text style={styles.label}>Raza o mezcla 🐕‍🦺</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Caniche, Mestizo..."
                    placeholderTextColor="#B5A0AC"
                    value={raza}
                    onChangeText={setRaza}
                    returnKeyType="done"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegistro}
                    disabled={cargando}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>
                        {cargando ? "Guardando..." : "Guardar perfil ✨"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
