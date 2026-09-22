import { useState, ChangeEvent, FormEvent, CSSProperties, JSX } from 'react';

interface UploadFormProps {
    apiBaseUrl: string;
    onHtmlExtracted?: (htmlContent: string) => void;
}

export function UploadForm({ apiBaseUrl, onHtmlExtracted }: UploadFormProps): JSX.Element {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrorMessage('Selecciona una imagen válida (.png, .jpg, .jpeg)');
                return;
            }

            setErrorMessage('');
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFile) return;

        setIsLoading(true);
        setErrorMessage('');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`${apiBaseUrl}/preview`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                setErrorMessage('Error al procesar la imagen con la IA.');
                return;
            }

            const data = await response.json();

            if (onHtmlExtracted && data.html) {
                onHtmlExtracted(data.html);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Problemas de conexión con el servicio';
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <h2 style={styles.title}>Digitalizar Documento</h2>
                <p style={styles.subtitle}>Sube una imagen para extraer su estructura con IA</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.uploadZone}>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isLoading}
                        style={styles.hiddenInput}
                    />
                    <label htmlFor="file-input" style={styles.fileLabel}>
                        <span style={styles.uploadIcon}>📁</span>
                        <span>{selectedFile ? selectedFile.name : 'Haz clic para seleccionar un archivo'}</span>
                    </label>
                </div>

                {previewUrl && (
                    <div style={styles.previewContainer}>
                        <span style={styles.subtext}>Previsualización del archivo</span>
                        <img src={previewUrl} alt="Vista previa" style={styles.previewImage} />
                    </div>
                )}

                {errorMessage && (
                    <div style={styles.errorBox}>
                        <span>⚠️ {errorMessage}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!selectedFile || isLoading}
                    style={{
                        ...styles.button,
                        ...(!selectedFile || isLoading ? styles.buttonDisabled : {}),
                    }}
                >
                    {isLoading ? 'Analizando con IA...' : 'Extraer Estructura HTML'}
                </button>
            </form>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    card: {
        padding: '32px',
        borderRadius: '16px',
        maxWidth: '480px',
        margin: '40px auto',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        border: '1px solid #f0f0f0',
    },
    header: {
        marginBottom: '24px',
        textAlign: 'center',
    },
    title: {
        margin: '0 0 8px 0',
        fontSize: '22px',
        color: '#1a1a1a',
        fontWeight: '700',
    },
    subtitle: {
        margin: 0,
        fontSize: '14px',
        color: '#666666',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    uploadZone: {
        border: '2px dashed #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#fafafa',
        transition: 'border-color 0.2s',
    },
    hiddenInput: {
        display: 'none',
    },
    fileLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        color: '#4a5568',
        fontSize: '14px',
        fontWeight: '500',
    },
    uploadIcon: {
        fontSize: '28px',
    },
    previewContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '12px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
    },
    subtext: {
        fontSize: '12px',
        color: '#64748b',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    previewImage: {
        maxHeight: '160px',
        maxWidth: '100%',
        borderRadius: '6px',
        objectFit: 'contain',
    },
    errorBox: {
        padding: '12px 16px',
        backgroundColor: '#fef2f2',
        borderRadius: '8px',
        color: '#dc2626',
        fontSize: '13px',
        fontWeight: '500',
        border: '1px solid #fecaca',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '15px',
        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
    },
    buttonDisabled: {
        backgroundColor: '#94a3b8',
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
};