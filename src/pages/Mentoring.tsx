import { AppBar } from "@/components/AppBar";
import { MentoringModal } from "@/components/MentoringModal";
import PageHeader from "@/components/reusable/PageHeader";
import PageMainContainer from "@/components/reusable/PageMainContainer";
import { useLoading } from "@/hooks/useLoading";
import { getMentores } from "@/services/mentoriasService";
import { MentoresType } from "@/types/mentorias";
import { useEffect, useState } from "react";

export default function Mentoring() {
  const [mentores, setMentores] = useState<MentoresType[]>([]);
  const { showLoading, hideLoading } = useLoading();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCalLink, setSelectedCalLink] = useState("");

  const handleOpenModal = (calLink: string) => {
    setSelectedCalLink(calLink);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCalLink("");
  };

  useEffect(() => {
    showLoading();
    getMentores(198)
      .then(({ data }) => {
        setMentores(data.data);
      })
      .catch((error) => {
        console.error("Error fetching mentors:", error);
      })
      .finally(() => {
        hideLoading();
      });
  }, []);

  return (
    <div className="app-container bg-transparent">
      {/* Header */}
      <PageHeader pageName="mentorias" />

      <PageMainContainer>
        {/* Network List */}
        <main className="space-y-3 ">
          {mentores.map((mentor, index) => (
            <div
              key={index}
              className="card-elevated p-5 transition-smooth hover:scale-[1.01] flex items-center justify-between"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span>{mentor.nome}</span>
              <button onClick={() => handleOpenModal("admin/teste")}>
                <i className="fi fi-ts-calendar" />
              </button>
            </div>
          ))}
        </main>
      </PageMainContainer>

      <AppBar />

      <MentoringModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        calLink={selectedCalLink}
      />
    </div>
  );
}
