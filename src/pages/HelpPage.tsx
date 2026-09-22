export function HelpPage() {
    return (
        <div style={helpStyles.container}>
            <div style={helpStyles.card}>
                <h2 style={helpStyles.title}>Criterios de Carga</h2>
                <p style={helpStyles.description}>
                    Sigue estas recomendaciones para garantizar una extracción precisa mediante Inteligencia Artificial:
                </p>
                <ul style={helpStyles.list}>
                    <li style={helpStyles.item}>
                        <span style={helpStyles.bullet}>✓</span>
                        <strong>Claridad:</strong> Sube fotos con buena iluminación y texto legible.
                    </li>
                    <li style={helpStyles.item}>
                        <span style={helpStyles.bullet}>✓</span>
                        <strong>Formatos admitidos:</strong> Archivos de imagen <code>.png</code>, <code>.jpg</code> o <code>.jpeg</code>.
                    </li>
                    <li style={helpStyles.item}>
                        <span style={helpStyles.bullet}>✓</span>
                        <strong>Encuadre:</strong> Evita sombras pronunciadas o bordes recortados en el documento.
                    </li>
                </ul>
            </div>
        </div>
    );
}

const helpStyles = {
    container: {
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '16px',
        maxWidth: '500px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f0f0f0',
    },
    title: {
        margin: '0 0 12px 0',
        fontSize: '20px',
        color: '#0f172a',
    },
    description: {
        fontSize: '14px',
        color: '#475569',
        lineHeight: '1.5',
        marginBottom: '20px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '12px',
    },
    item: {
        fontSize: '14px',
        color: '#334155',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    bullet: {
        color: '#16a34a',
        fontWeight: 'bold',
    },
};