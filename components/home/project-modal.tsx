import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import { Button } from "@/components/ui/button";

export type ProjectData = {
    id: number;
    title: string;
    sector: string;
    description: string;
    fullDescription?: string;
    features?: string[];
    image: string;
    videoUrl?: string; // URL del video
    metrics: { label: string; value: string; icon: any }[];
    color: string;
    tags: string[];
    link?: string;
    estimatedCost?: string;
};

type ProjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectData | null;
};

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    const { open: openContact } = useContactModal();
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0E141B] border border-white/10 shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 transition hover:bg-white/20 hover:text-white backdrop-blur-md"
                            aria-label="Cerrar"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Content Container */}
                        <div className="grid grid-cols-1 lg:grid-cols-2">

                            {/* Left Column: Media (Video/Image) */}
                            <div className={`relative h-64 lg:h-full min-h-[300px] bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                                {project.videoUrl ? (
                                    <video
                                        src={project.videoUrl}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                    />
                                ) : (
                                    <div className="text-center p-8">
                                        <span className="text-8xl mb-4 block filter drop-shadow-2xl animate-pulse">
                                            {project.image}
                                        </span>
                                        <p className="text-white/60 font-medium text-sm mt-4 bg-black/20 px-4 py-2 rounded-full inline-block backdrop-blur-sm">
                                            Video Demo Coming Soon
                                        </p>
                                    </div>
                                )}

                                {/* Decorative overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0E141B] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0E141B]" />
                            </div>

                            {/* Right Column: Details */}
                            <div className="p-6 sm:p-8 lg:p-10 space-y-6 lg:max-h-[85vh] lg:overflow-y-auto custom-scrollbar">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-accent/80">
                                            {project.sector}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                                        {project.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/5">
                                    {project.metrics.map((metric, i) => {
                                        const Icon = metric.icon;
                                        return (
                                            <div key={i} className="text-center p-2 rounded-lg bg-white/5 border border-white/5">
                                                <Icon className="h-4 w-4 text-accent2 mx-auto mb-1" />
                                                <div className="font-bold text-white text-lg">{metric.value}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-white/50">{metric.label}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-accent" />
                                        Descripción del Proyecto
                                    </h3>
                                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                                        {project.fullDescription || project.description}
                                    </p>
                                </div>

                                {project.features && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-accent" />
                                            Funcionalidades Clave
                                        </h3>
                                        <ul className="grid grid-cols-1 gap-2">
                                            {project.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-white/70 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent2 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.estimatedCost && (
                                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-between group/cost hover:border-emerald-500/40 transition-colors">
                                        <div>
                                            <p className="text-sm font-medium text-emerald-400">Inversión Estimada</p>
                                            <p className="text-xs text-white/40 mt-0.5">Precio de referencia para un sistema similar</p>
                                        </div>
                                        <div className="text-2xl font-bold text-white tracking-tight tabular-nums group-hover/cost:text-emerald-400 transition-colors">
                                            {project.estimatedCost}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                                    {project.link && (
                                        <Button className="flex-1 gap-2 bg-white/10 hover:bg-white/20 text-white border-0" asChild>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                Visitar sitio web <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                    <Button
                                        className={`flex-1 gap-2 bg-gradient-to-r from-accent via-accent2 to-accent hover:shadow-lg hover:shadow-accent2/20 text-[#0E141B] font-semibold border-0 ${!project.link ? 'w-full' : ''}`}
                                        onClick={() => {
                                            onClose();
                                            openContact(`Hola, me interesa un proyecto similar a: ${project.title}`);
                                        }}
                                    >
                                        Quiero algo similar <Sparkles className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
